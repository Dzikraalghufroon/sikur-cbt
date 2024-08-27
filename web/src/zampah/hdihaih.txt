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
  const { id } = useParams();
  const navigate = useNavigate();
  const [opsiterisi, setOpsiterisi] = useState([]);

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
          const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_jawaban_pilihan_user/${currentSoalId}`, { withCredentials: true });
          setOpsiterisi(response.data);
        } catch (error) {
          console.error('Error fetching opsiterisi data:', error);
        }
      };
      fetchOpsiterisi();
    }
  }, [currentSoalIndex, soal]);

  const handleJawabanChange = (soalId, jawaban) => {
    setSelectedJawaban(prev => ({
      ...prev,
      [soalId]: jawaban
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

  const currentSoal = soal[currentSoalIndex];

  // Function to check if the option is selected
  const isSelected = (jawaban) => {
    return opsiterisi.some(op => op.jawaban === jawaban);
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
              <img
                src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.filesoal}`}
                alt={currentSoal.filesoal}
                className={Styles.image}
              />
              <div className={Styles.jawabanContainer}>
                {currentSoal.opsi_a && (
                  <div
                    className={
                      isSelected("opsi_a")
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
                      className={`${Styles.label} ${selectedJawaban[currentSoal.id] === "opsi_a" ? Styles.labelActive : ""}`}
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
                    </label>
                  </div>
                )}
                {currentSoal.opsi_b && (
                  <div
                    className={
                      isSelected("opsi_b")
                        ? Styles.jawabanItemActive
                        : Styles.jawabanItem
                    }
                  >
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_b-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_b"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_b'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_b')}
                    />
                    <label
                      htmlFor={`opsi_b-${currentSoal.id}`}
                      className={`${Styles.label} ${selectedJawaban[currentSoal.id] === 'opsi_b' ? Styles.labelActive : ""}`}
                    >
                      <div className={Styles.letterBox}>B</div>
                      {currentSoal.file_b && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_b}`}
                          alt={currentSoal.file_b}
                          className={Styles.image}
                        />
                      )}
                      <br /><br /><p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_b }} />
                    </label>
                  </div>
                )}
                {currentSoal.opsi_c && (
                  <div
                    className={
                      isSelected("opsi_c")
                        ? Styles.jawabanItemActive
                        : Styles.jawabanItem
                    }
                  >
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_c-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_c"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_c'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_c')}
                    />
                    <label
                      htmlFor={`opsi_c-${currentSoal.id}`}
                      className={`${Styles.label} ${selectedJawaban[currentSoal.id] === 'opsi_c' ? Styles.labelActive : ""}`}
                    >
                      <div className={Styles.letterBox}>C</div>
                      {currentSoal.file_c && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_c}`}
                          alt={currentSoal.file_c}
                          className={Styles.image}
                        />
                      )}
                      <br /><br /><p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_c }} />
                    </label>
                  </div>
                )}
                {currentSoal.opsi_d && (
                  <div
                    className={
                      isSelected("opsi_d")
                        ? Styles.jawabanItemActive
                        : Styles.jawabanItem
                    }
                  >
                    <input
                      className={Styles.input}
                      type="radio"
                      id={`opsi_d-${currentSoal.id}`}
                      name={`soal-${currentSoal.id}`}
                      value="opsi_d"
                      checked={selectedJawaban[currentSoal.id] === 'opsi_d'}
                      onChange={() => handleJawabanChange(currentSoal.id, 'opsi_d')}
                    />
                    <label
                      htmlFor={`opsi_d-${currentSoal.id}`}
                      className={`${Styles.label} ${selectedJawaban[currentSoal.id] === 'opsi_d' ? Styles.labelActive : ""}`}
                    >
                      <div className={Styles.letterBox}>D</div>
                      {currentSoal.file_d && (
                        <img
                          src={`${import.meta.env.VITE_SERVER}/get-img/${currentSoal.file_d}`}
                          alt={currentSoal.file_d}
                          className={Styles.image}
                        />
                      )}
                      <br /><br /><p dangerouslySetInnerHTML={{ __html: currentSoal.opsi_d }} />
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={Styles.navButtons}>
          <button onClick={prevSoal}>Sebelumnya</button>
          <button onClick={nextSoal}>Selanjutnya</button>
          <button onClick={submitJawaban}>Kirim Jawaban</button>
        </div>
      </div>
      
      <div>
        
      
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {showModal && (
        <Modal
          onClose={toggleModal}
        />
      )}
</div>
<Footer />
    </div>
  );
};

export default UjianPage;
