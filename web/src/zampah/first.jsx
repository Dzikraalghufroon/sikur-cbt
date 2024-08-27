import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Styles from './Ujian.module.css';
import Navbar from '../../komponen/Navbar/navbar';
import Footer from '../../komponen/footer/footer';
import ConfirmModal from '../../komponen/popup/ConfirmModal';
import Modal from '../../komponen/popup/modal';

const UjianPage = () => {
  const [soal, setSoal] = useState([]);
  const [selectedJawaban, setSelectedJawaban] = useState({});
  const [currentSoalIndex, setCurrentSoalIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [answer, setanswer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [opsiterisi, setopsiterisi] = useState(null)

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_ujian_user/${id}`, { withCredentials: true });
        setSoal(response.data);
      } catch (error) {
        console.error('Error fetching soal data:', error);
      }
    };
    fetchSoal();
  }, [id]);


  useEffect(() => {
    const fetchopsi = async () => {
      const currentSoalId = soal[currentSoalIndex].id;
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_jawaban_pilihan_user/${currentSoalId}`, { withCredentials: true });
        console.log(response.data)
        setopsiterisi(response.data);
      } catch (error) {
        console.error('Error fetching soal data:', error);
      }
    };
    fetchopsi();
  }, [currentSoalIndex, soal]);

  // const handleJawabanChange = (soalId, jawaban) => {
  //   setSelectedJawaban(prev => ({
  //     ...prev,
  //     [soalId]: jawaban
  //   }));
  // };
  const handleJawabanChange = (soalId, jawaban) => {
    setSelectedJawaban(prev => ({
      ...prev,
      [parseInt(soalId)]: jawaban
    }));
  };

  const nextSoal = () => {
    setCurrentSoalIndex(prevIndex => Math.min(prevIndex + 1, soal.length - 1));
  };
  const prevSoal = () => {
    setCurrentSoalIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const submitJawaban = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    //const selectedJawaban = parseInt(selectedJawaban, 10);
    console.log(selectedJawaban)
    setShowConfirmModal(false);
    try {
      const currentSoalId = soal[currentSoalIndex].id; // Mendapatkan ID soal saat ini
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] }; // Membuat objek jawaban untuk soal saat ini
      //console.log(jawabanToSend)
      await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
      //await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user_complete/${id}`, selectedJawaban, { withCredentials: true });
      alert('Jawaban berhasil dikirim!');
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error sending answers:', error);
      alert('Terjadi kesalahan saat mengirim jawaban.');
    }
  };

  // const handlesubmitprev = async () => {
  //   try {
  //     setCurrentSoalIndex(prevIndex => Math.max(prevIndex - 1, 0));
  //     await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, selectedJawaban, { withCredentials: true });

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handlesubmitprev = async () => {
    try {
      const currentSoalId = soal[currentSoalIndex].id; // Mendapatkan ID soal saat ini
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] }; // Membuat objek jawaban untuk soal saat ini
      console.log(jawabanToSend)
      await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });

      setCurrentSoalIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } catch (error) {
      console.error(error);
    }
  };


  const handlesubmitnext = async () => {
    try {
      const currentSoalId = soal[currentSoalIndex].id; // Mendapatkan ID soal saat ini
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] }; // Membuat objek jawaban untuk soal saat ini
      //console.log(jawabanToSend)
      await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });

      setCurrentSoalIndex(prevIndex => Math.min(prevIndex + 1, soal.length - 1));
      //await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, selectedJawaban, { withCredentials: true });

    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const currentSoal = soal[currentSoalIndex];
  const currentSoal2 = soal[answer]

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Halaman sedang dilihat oleh pengguna.");
        //navigate("/")
        // Lanjutkan aktivitas, seperti animasi atau polling data
      } else {
        console.log("Halaman tidak sedang dilihat oleh pengguna.");
        // Jeda atau hentikan aktivitas yang tidak perlu
      }
    };

    const handleBeforeUnload = (e) => {
      console.log("Halaman akan ditutup atau pengguna akan berpindah halaman.");
      // Anda bisa menambahkan logika di sini, seperti menyimpan data sementara
      const confirmationMessage = 'Are you sure you want to leave?';
      e.returnValue = confirmationMessage; // Standar lama untuk browser lama
      return confirmationMessage; // Standar baru untuk browser modern
    };

    const handleUnload = () => {
      console.log("Halaman telah ditutup.");
      // Tambahkan logika untuk pembersihan atau penyimpanan data sebelum halaman benar-benar ditutup
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    // Membersihkan event listener ketika komponen unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);



  return (
    <div className={Styles.bodi}>
      <Navbar />
      <div className={Styles.ujianContainer}>
        <div className={Styles.soalSection}>
          {currentSoal && (
            <div>
              <h2>Soal No. {currentSoalIndex + 1}</h2>
              <div dangerouslySetInnerHTML={{ __html: currentSoal.soal }} />
              <img
                src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.filesoal}`}
                alt={currentSoal.filesoal}
                className={Styles.image}
              />
              <div className={Styles.jawabanContainer}>
                {/*                 
                {currentSoal.opsi_a && (
                  <div className={Styles.jawabanItem}>
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_a-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_a"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_a'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_a')}
                    />
                    <label htmlFor={`opsi_a-${currentSoal.id}`} className={Styles.label}>
                      <div className={Styles.letterBox}>A</div>
                      {currentSoal.file_a && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_a}`}
                          alt={currentSoal.file_a}
                          className={Styles.image}
                        />
                      )}
                      <br /><br /><p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_a }} />
                    </label>
                  </div>
                )} */}
                {currentSoal.opsi_a && (
                  <div
                    className={
                      opsiterisi?.jawaban === "opsi_a"
                        ? Styles.jawabanItemActive
                        : Styles.jawabanItem
                    }
                  >
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_a-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_a"
                      checked={selectedJawaban[currentSoal.id] === "opsi_a"}
                      onChange={() => handleJawabanChange(currentSoal.id, "opsi_a")}
                    />
                    <label
                      htmlFor={`opsi_a-${currentSoal.id}`}
                      className={`${Styles.label} ${selectedJawaban[currentSoal.id] === "opsi_a"
                          ? Styles.labelActive
                          : ""
                        }`}
                    >
                      <div className={Styles.letterBox}>A</div>
                      {currentSoal.file_a && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_a}`}
                          alt={currentSoal.file_a}
                          className={Styles.image}
                        />
                      )}
                      <br /><br /><p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_a }} />
                      <p>{opsiterisi.jawaban}</p>
                    </label>
                  </div>
                )}
                {currentSoal.opsi_b && (
                  <div className={Styles.jawabanItem}>
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_b-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_b"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_b'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_b')}
                    />
                    <label htmlFor={`opsi_b-${currentSoal.id}`} className={Styles.label}>
                      <div className={Styles.letterBox}>B</div>
                      {currentSoal.file_b && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_b}`}
                          alt={currentSoal.file_b}
                          className={Styles.image}
                        />
                      )}
                      <p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_b }} />
                    </label>
                  </div>
                )}

                {currentSoal.opsi_c && (
                  <div className={Styles.jawabanItem}>
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_c-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_c"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_c'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_c')}
                    />
                    <label htmlFor={`opsi_c-${currentSoal.id}`} className={Styles.label}>
                      <div className={Styles.letterBox}>C</div>
                      {currentSoal.file_c && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_c}`}
                          alt={currentSoal.file_c}
                          className={Styles.image}
                        />
                      )}
                      <p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_c }} />
                    </label>
                  </div>
                )}
                {currentSoal.opsi_d && (
                  <div className={Styles.jawabanItem}>
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_d-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_d"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_d'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_d')}
                    />
                    <label htmlFor={`opsi_d-${currentSoal.id}`} className={Styles.label}>
                      <div className={Styles.letterBox}>D</div>
                      {currentSoal.file_d && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_d}`}
                          alt={currentSoal.file_d}
                          className={Styles.image}
                        />
                      )}
                      <p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_d }} />
                    </label>
                  </div>
                )}
                {currentSoal.opsi_e && (
                  <div className={Styles.jawabanItem}>
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_e-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_e"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_e'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_e')}
                    />
                    <label htmlFor={`opsi_e-${currentSoal.id}`} className={Styles.label}>
                      <div className={Styles.letterBox}>E</div>
                      {currentSoal.file_e && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_e}`}
                          alt={currentSoal.file_e}
                          className={Styles.image}
                        />
                      )}
                      <p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_e }} />
                    </label>
                  </div>
                )}
              </div>
              <div className={Styles.navButtons}>
                <button onClick={handlesubmitprev} disabled={currentSoalIndex === 0}>
                  Sebelumnya
                </button>
                <button onClick={handlesubmitnext} disabled={currentSoalIndex === soal.length - 1}>
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={Styles.sidebarSection}>
          <h4>Navigasi Soal</h4>
          <div className={Styles.sidebarButtons}>
            {soal.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSoalIndex(index)}
                className={currentSoalIndex === index ? Styles.active : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className={Styles.navButtons}>
            <button onClick={submitJawaban}>
              Kirim Jawaban
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <ConfirmModal
        show={showConfirmModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Apakah Anda yakin ingin mengirim jawaban ini?"
      />
      <div>
        <Modal
          show={showModal}
          handleClose={toggleModal}
          title="Mulailah dengan berdoa terlebih dahulu"
        >
          <p>ASU!</p>
        </Modal>
      </div>
    </div>
  );
};

export default UjianPage;
