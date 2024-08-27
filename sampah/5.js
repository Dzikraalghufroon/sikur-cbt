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
  const [showModal, setShowModal] = useState(false);
  const [opsiterisi, setOpsiterisi] = useState([]);
  const [nomorterisi, setNomorterisi] = useState([]);
  const [durasi, setdurasi] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(()=>{
    const fetchdurasi = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_durasi_ujian/${id}`)
        console.log(response.data);
        setdurasi(response.data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchdurasi();
  }, [id])

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


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
    if (soal.length > 0) {
      const fetchOpsiterisi = async () => {
        const currentSoalId = soal[currentSoalIndex].id;
        try {
          const opsiterisiResponse = await axios.get(`${import.meta.env.VITE_SERVER}/read_jawaban_pilihan_user/${currentSoalId}`, { withCredentials: true });
          setOpsiterisi(opsiterisiResponse.data);
        } catch (error) {
          console.error('Error fetching opsiterisi data:', error);
        }
      };
      fetchOpsiterisi();
    }
  }, [currentSoalIndex, soal]);

  useEffect(() => {
    const fetchNomorTerisi = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_nomor_terisi_user/${id}`, { withCredentials: true });
        setNomorterisi(response.data);
      } catch (error) {
        console.error('Error fetching nomor terisi data:', error);
      }
    };
    fetchNomorTerisi();
  }, [id]);


  // const handleJawabanChange = (soalId, jawaban) => {
  //   setSelectedJawaban(prev => ({
  //     ...prev,
  //     [soalId]: jawaban
  //   }));
  // };

  const handleSubmit = async (direction) => {
    try {
      const currentSoalId = soal[currentSoalIndex].id;
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };

      if (direction === 'prev') {
        setCurrentSoalIndex(prevIndex => Math.max(prevIndex - 1, 0));
        await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });

      } else if (direction === 'next') {
        setCurrentSoalIndex(prevIndex => Math.min(prevIndex + 1, soal.length - 1));
        await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });


      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const submitJawaban = async () => {
    setShowConfirmModal(true);

    const currentSoalId = soal[currentSoalIndex].id;
    const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };

    await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });

    await axios.get(`${import.meta.env.VITE_SERVER}/insert_data_siswa/${id}`, { withCredentials: true });
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    //try {
    const currentSoalId = soal[currentSoalIndex].id;
    const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };
    await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
    alert('Jawaban berhasil dikirim!');
    navigate('/user-dashboard');
    // } catch (error) {
    //   console.error('Error sending answers:', error);
    //   alert('Terjadi kesalahan saat mengirim jawaban.');
    // }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const isSelected = (jawaban) => {
    return opsiterisi.some(op => op.jawaban === jawaban);
  };

  const isterjawab = (id_soal) => {
    return nomorterisi.some(op => op.id_soal === id_soal);
  };

  const currentSoal = soal[currentSoalIndex];

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        console.log("Halaman sedang dilihat oleh pengguna.");
        // const currentSoalId = soal[currentSoalIndex].id;
        // const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };

        //await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
        await axios.get(`${import.meta.env.VITE_SERVER}/insert_data_siswa/${id}`, { withCredentials: true });

        localStorage.removeItem('Token');
        navigate('/');

      } else {
        //const currentSoalId = soal[currentSoalIndex].id;
        //const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };
        await axios.get(`${import.meta.env.VITE_SERVER}/insert_data_siswa/${id}`, { withCredentials: true });

        //await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
        console.log("Halaman tidak sedang dilihat oleh pengguna.");
        localStorage.removeItem('Token');
        navigate('/');
      }
    };

    const handleBeforeUnload = (e) => {
      const confirmationMessage = 'asu?';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);
  const handlenomor = async (index) => {
    try {
      const currentSoalId = soal[currentSoalIndex].id;
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };

      if (jawabanToSend[currentSoalId]) {
        setCurrentSoalIndex(index);
        await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });

        // Update `nomorterisi` here
        setNomorterisi(prev => [...prev, { id_soal: currentSoalId }]);
      } else {
        setCurrentSoalIndex(index);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleJawabanChange = (soalId, jawaban) => {
    setSelectedJawaban(prev => ({
      ...prev,
      [soalId]: jawaban
    }));

    // Update `nomorterisi` when a valid answer is selected
    if (!nomorterisi.some(n => n.id_soal === soalId)) {
      setNomorterisi(prev => [...prev, { id_soal: soalId }]);
    }
  };

  return (
    <div className={Styles.bodi}>
      <Navbar />
      <div className={Styles.ujianContainer}>
        <div className={Styles.soalSection}>
          {currentSoal && (
            <div>
              <h2>Soal No. {currentSoalIndex + 1}</h2>
              {/* <p>{currentTime}</p>
              <p>{durasi}</p> */}
              {/* <h3>      <div>{durasi.map((data, index)=>((<p>{data.durasi}</p>)))}</div></h3> */}
              <div dangerouslySetInnerHTML={{ __html: currentSoal.soal }} />
              {currentSoal.filesoal && (
                <img
                  src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.filesoal}`}
                  alt={currentSoal.filesoal}
                  className={Styles.image}
                />
              )}
              <div className={Styles.jawabanContainer}>
                {['a', 'b', 'c', 'd', 'e'].map((option) => {
                  const opsiKey = `opsi_${option}`;
                  const fileKey = `file_${option}`;
                  return currentSoal[opsiKey] ? (
                    <div
                      key={option}
                      className={isSelected(opsiKey) ? Styles.jawabanItemActive : Styles.jawabanItem}
                    >
                      <input
                        className={Styles.input}
                        type="radio"
                        id={`${opsiKey}-${currentSoal.id}`}
                        name={`soal-${currentSoal.id}`}
                        value={opsiKey}
                        checked={selectedJawaban[currentSoal.id] === opsiKey}
                        onChange={() => handleJawabanChange(currentSoal.id, opsiKey)}
                      />
                      <label
                        htmlFor={`${opsiKey}-${currentSoal.id}`}
                        className={`${Styles.label} ${selectedJawaban[currentSoal.id] === opsiKey ? Styles.labelActive : ""}`}
                      >
                        <div className={Styles.letterBox}>{option.toUpperCase()}</div>
                        {currentSoal[fileKey] && (
                          <img
                            src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal[fileKey]}`}
                            alt={currentSoal[fileKey]}
                            className={Styles.image}
                          />
                        )}
                        <br /><br /><p dangerouslySetInnerHTML={{ __html: currentSoal[opsiKey] }} />
                      </label>
                    </div>
                  ) : null;
                })}
              </div>
              <div className={Styles.navButtons}>
                <button onClick={() => handleSubmit('prev')} disabled={currentSoalIndex === 0}>
                  Sebelumnya
                </button>
                <button onClick={() => handleSubmit('next')} disabled={currentSoalIndex === soal.length - 1}>
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={Styles.sidebarSection}>
          <h4>Navigasi Soal</h4>
          <div className={Styles.sidebarButtons}>
            {soal.map((soalItem, index) => {
              const isAnswered = isterjawab(soalItem.id);
              const isActive = currentSoalIndex === index;
              const idsoal = soalItem.id;

              return (
                <div
                  key={index}
                  className={`${isAnswered ? Styles.sudahterjawab : Styles.kosong} ${isActive ? Styles.active : ''}`}
                >
                  <button
                    //onClick={() => setCurrentSoalIndex(index)}
                    onClick={() => handlenomor(index)}
                    className={`${isActive ? Styles.activeButton : ''}`}
                  >
                    {index + 1}
                  </button>
                </div>
              );
            })}
          </div>
          <div className={Styles.navButtons}>
            <button onClick={submitJawaban}>
              Kirim Jawaban
            </button>
          </div>
        </div>


      </div>
      <ConfirmModal
        show={showConfirmModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Apakah Anda yakin ingin mengirim jawaban ini?"
      />
      <Modal
        show={showModal}
        handleClose={toggleModal}
        title="Mulailah dengan berdoa terlebih dahulu..."
      />
    </div>
  );
};

export default UjianPage;
