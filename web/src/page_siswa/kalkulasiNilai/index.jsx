import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from './Ujian.module.css';
import Navbar from '../komponen/Navbar/navbar';
import Footer from '../komponen/footer/footer';
import Satu from "../komponen/asset/ic_exam.png";
import { useNavigate, Link } from 'react-router-dom';

const Kalkulasi_nilai_siswa = () => {
  const Navigate = useNavigate();
  const [siswa, setsiswa] = useState({});
  const [kelas, setkelas] = useState([]);

  useEffect(() => {
    const fetchsiswaData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/get`, {
          withCredentials: true
        });
        //console.log(response.data);

        if (response.data.stat) {
          setsiswa(response.data.data);
        } else {
          //console.log(response.data.text);
        }
      } catch (error) {
        console.error("Error fetching siswa data:", error);
      }
    };
    fetchsiswaData();
  }, []);


  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_kelas_user`, { withCredentials: true });//('http://localhost:2000/read-siswa');
        setkelas(response.data);
        //console.log(response.data)
      } catch (error) {
        console.error('Error fetching siswa data:', error);
      }
    };
    fetchSiswa();
  }, []);

  const Kembali = () => {
    Navigate(-1);
  };
  //${kelasItem.name} onClick={() => Navigate('/mainpag')} <a className={Styles.gridItem}> </a>

  return (
    <div className={Styles.bodi}>
      <Navbar /><br /><br /><br />
      <div className={Styles.dashboard}>
        <div className={Styles.container}>
          <button onClick={Kembali} className={Styles.button2}>Kembali</button>
          <h4 className={Styles.heading}>HASIL TES DARI: {siswa && siswa.name ? siswa.name : "Loading..."}</h4>

          {Array.isArray(kelas) && kelas.length > 0 ? (
            kelas
            .filter(kelasItem => kelasItem !== null)
            .map((kelasItem, index) => (
              <div className={Styles.container2}>
                <h3 className={Styles.title2}>Lihat Laporan Nilai</h3>
                <table className={Styles.table2}>
                  <tbody>
                    <React.Fragment key={index}>
                      <tr className={Styles.row2}>
                        <td className={Styles.label2}>Mata Pelajaran</td>
                        <td className={Styles.value2}>{kelasItem.bank_soal}</td>
                      </tr>
                      <tr className={Styles.row2}>
                        <td className={Styles.label2}>Kelas</td>
                        <td className={Styles.value2}>{kelasItem.kelas}</td>
                      </tr>
                      <tr className={Styles.row2}>
                        <td className={Styles.label2}>Durasi</td>
                        <td className={Styles.value2}>{kelasItem.durasi}</td>
                      </tr>
                      <tr className={Styles.row}>
                        <td colSpan="2" className={Styles.buttonContainer}>
                          <Link to={`/kalkulasi_nilai/${kelasItem.id}`}>
                            <button className={Styles.button2}>Lihat Nilai</button>
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <tr>
              <td colSpan="2">
                <h3 className={Styles.alert}>Tidak ada nilai untuk ditampilkan hari ini</h3>
              </td>
            </tr>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Kalkulasi_nilai_siswa;
