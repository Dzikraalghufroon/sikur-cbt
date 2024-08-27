import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Styles from './Ujian.module.css';
import Navbar from '../../komponen/Navbar/navbar';
import Footer from '../../komponen/footer/footer';

const UjianPage = () => {
  const [soal, setSoal] = useState([]);
  const [selectedJawaban, setSelectedJawaban] = useState({});
  const [currentSoalIndex, setCurrentSoalIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch data soal from server
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

  const submitJawaban = async () => {
    try {
      const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
      if (confirmDelete) {
        await axios.post(`${import.meta.env.VITE_SERVER}/jawaban_user/${id}`, selectedJawaban, { withCredentials: true });
        alert('Jawaban berhasil dikirim!');
        navigate('/thankyou');
      }
    }
     catch (error) {
      console.error('Error sending answers:', error);
      alert('Terjadi kesalahan saat mengirim jawaban.');
    }
  };

  const currentSoal = soal[currentSoalIndex];

  return (
    <div className={Styles.bodi}>
      <Navbar />
      <div className={Styles.ujianContainer}>
        <div className={Styles.soalSection}>
          {currentSoal && (
            <div>
              <h2>Soal No. {currentSoalIndex + 1}</h2>
              <div dangerouslySetInnerHTML={{ __html: currentSoal.soal }} />
              <div className={Styles.jawabanContainer}>
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
                <button onClick={prevSoal} disabled={currentSoalIndex === 0}>
                  Sebelumnya
                </button>
                <button onClick={nextSoal} disabled={currentSoalIndex === soal.length - 1}>
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
    </div>
  );
};

export default UjianPage;
