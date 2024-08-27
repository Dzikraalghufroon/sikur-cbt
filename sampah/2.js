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
  const { id } = useParams();
  const navigate = useNavigate();

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
    if (soal.length > 0) {
      const fetchOpsiterisi = async () => {
        const currentSoalId = soal[currentSoalIndex].id;
        try {
          const opsiterisiResponse = await axios.get(`${import.meta.env.VITE_SERVER}/read_jawaban_pilihan_user/${currentSoalId}`, { withCredentials: true });
          setOpsiterisi(opsiterisiResponse.data);

          // if (opsiterisiResponse.data.length > 0) {
          //   setOpsiterisi(opsiterisiResponse.data);
          // } else {
          //   console.log("Belum ada opsi terisi.");
          //   setOpsiterisi(null)
          // }
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
        // if (response.data.length > 0) {
        //   setNomorterisi(response.data);
        // } else {
        //   console.log("Belum ada nomor terisi.");
        //   setNomorterisi(null)
        // }
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
  // const handleJawabanChange = (soalId, jawaban) => {
  //   setSelectedJawaban(prev => ({
  //     ...prev,
  //     [soalId]: jawaban
  //   }));
  
    // Update nomorterisi jika belum ada
    if (!nomorterisi.includes(soalId)) {
      setNomorterisi(prev => [...prev, soalId]);
    }
  };
  const handleJawabanChange = (soalId, jawaban) => {
    setSelectedJawaban(prev => ({
      ...prev,
      [soalId]: jawaban
    }));
  
    // Tambahkan id_soal ke nomorterisi jika belum ada
    if (!nomorterisi.includes(soalId)) {
      setNomorterisi(prev => [...prev, soalId]);
    }
  };
  
  

  const handleSubmit = async (direction) => {
    try {
      const currentSoalId = soal[currentSoalIndex].id;
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };
      // await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });

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
  
    try {
      const currentSoalId = soal[currentSoalIndex].id;
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };
  
      // Kirim jawaban
      await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
  
      // Kirim data nomor terisi
      await axios.post(`${import.meta.env.VITE_SERVER}/update_nomor_terisi_user/${id}`, { nomorterisi }, { withCredentials: true });
  
      // Kirim data akhir
      await axios.get(`${import.meta.env.VITE_SERVER}/insert_data_siswa/${id}`, { withCredentials: true });
  
      alert('Jawaban berhasil dikirim!');
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error sending answers:', error);
      alert('Terjadi kesalahan saat mengirim jawaban.');
    }
  };
  

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    try {
      const currentSoalId = soal[currentSoalIndex].id;
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };
      await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
      alert('Jawaban berhasil dikirim!');
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error sending answers:', error);
      alert('Terjadi kesalahan saat mengirim jawaban.');
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const isSelected = (jawaban) => {
    return opsiterisi.some(op => op.jawaban === jawaban);
  };

  const isterjawab = (id_soal) => {
    console.log('nomorterisi:', nomorterisi); // Debug log
    return nomorterisi.includes(id_soal);
  };
  

  const currentSoal = soal[currentSoalIndex];

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Halaman sedang dilihat oleh pengguna.");
      } else {
        console.log("Halaman tidak sedang dilihat oleh pengguna.");
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

  // const handlenomor = async (index) => {
  //   try {
  //     const currentSoalId = soal[currentSoalIndex].id;
  //     const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };
  //     // await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });

  //     if (jawabanToSend.length === 0) {
  //       console.log(index)
  //       setCurrentSoalIndex(index);
  //     }else{
  //       setCurrentSoalIndex(index);
  //       await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
  //       console.log("bismillah");
        
  //       isterjawab()
  //     //setCurrentSoalIndex(index);
  //     }

  //   } catch (error) {
  //     console.error('Error submitting answer:', error);
  //   }
  // };
  const handlenomor = async (index) => {
    try {
      const currentSoalId = soal[currentSoalIndex].id;
      const jawabanToSend = { [currentSoalId]: selectedJawaban[currentSoalId] };
  
      if (jawabanToSend[currentSoalId]) {
        await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, jawabanToSend, { withCredentials: true });
      }
  
      setCurrentSoalIndex(index);
  
      // Update nomorterisi jika belum ada
      if (!nomorterisi.includes(soal[index].id)) {
        setNomorterisi(prev => [...prev, soal[index].id]);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
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
      {/* <Footer /> */}
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
