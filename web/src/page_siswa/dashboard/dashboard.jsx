import React, { useState, useEffect } from 'react';
import Styles from './Dashboard.module.css';
import Navbar from '../komponen/Navbar/navbar';
import Footer from '../komponen/footer/footer';
import Satu from '../komponen/asset/ic_exam.png';
import Dua from '../komponen/asset/ic_clipboard.png';
import Tiga from '../komponen/asset/ic_connection.png';
import Empat from '../komponen/asset/ic_global_network.png';
import { useNavigate } from 'react-router-dom';
import Modal from '../komponen/popup/modal';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [Pengumuman, setPengumuman] = useState("");
  const [kelassiswa, setkelassiswa ] = useState("");

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_pengumuman`)
        setPengumuman(response.data)

      } catch (error) {
        console.log(error)
      }
    }; fetchPengumuman();
  }, [])

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const fetchKelasData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/getsiswa`, {
                withCredentials: true
            });
            console.log(response.data);

            if (response.data.stat) {
                setkelassiswa(response.data.data);
            } else {
                console.log(response.data.text);
            }
        } catch (error) {
            console.error("Error fetching kelas data:", error);
        }
    };
    fetchKelasData();
}, []);

  return (
    <div className={Styles.bodi}>
      <Navbar />
      <section className={Styles.dashboard}>
        <div className={Styles.container}>
          <h1 className={Styles.heading}>Dashboard</h1>
          <p>{kelassiswa.name}</p>
          <div className={Styles.gridContainer}>
            <a onClick={() => navigate('/mainpage')} className={Styles.gridItem}>
              <article className={Styles.logo}>
                <img src={Satu} alt="Penilaian Icon" />
                <h5 className={Styles.h5}>Penilaian</h5>
              </article>
            </a>
            <a onClick={() => navigate('/nilai_siswa')} className={Styles.gridItem}>
              <article className={Styles.logo}>
                <img src={Dua} alt="Tests Icon" />
                <h5 className={Styles.h5}>Lihat Nilai</h5>
              </article>
            </a>
            <a onClick={() => navigate('/mainpage')} className={Styles.gridItem}>
              <article className={Styles.logo}>
                <img src={Tiga} alt="Tests Icon" />
                <h5 className={Styles.h5}>Tests</h5>
              </article>
            </a>
            <a onClick={() => navigate('/mainpage')} className={Styles.gridItem}>
              <article className={Styles.logo}>
                <img src={Empat} alt="Tests Icon" />
                <h5 className={Styles.h5}>Tests</h5>
              </article>
            </a>
          </div>
          <div className={Styles.container2}>
            <h3 className={Styles.heading2}>Pengumuman</h3>
            <div className={Styles.Pengumuman}>
              {Array.isArray(Pengumuman) && Pengumuman.length > 0 ? (
                Pengumuman.map((isi, index) => (
                  <React.Fragment key={index}>
                    <ul>
                      <h4>Operator</h4><br />
                      <p>{isi.isi}<br/><br/><br/>
                      <h5>{isi.reg_date}</h5> </p>                 <br />
                    </ul><br /><br />
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className={Styles.emptyMessage}>Data kosong</td>
                </tr>
              )}
            </div>
          </div>
        </div>

        <div>
          <Modal
            show={showModal}
            handleClose={toggleModal}
            title="HALO SELAMAT DATANG"
          >
            <p>ASU!</p>
          </Modal>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
