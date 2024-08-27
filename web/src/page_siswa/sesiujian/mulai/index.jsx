import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from './Ujian.module.css';
import Navbar from '../../komponen/Navbar/navbar';
import Footer from '../../komponen/footer/footer';
import Satu from "../../komponen/asset/ic_exam.png";
import { useNavigate, Link } from 'react-router-dom';

const Ujiansiswa = () => {
  const Navigate = useNavigate();
  const [siswa, setsiswa] = useState({});
  const [kelas, setkelas] = useState([]);

  useEffect(() => {
    const fetchsiswaData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/get`, {
          withCredentials: true
        });
        console.log(response.data);

        if (response.data.stat) {
          setsiswa(response.data.data);
        } else {
          console.log(response.data.text);
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
        console.log(response.data)
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
          <h1 className={Styles.heading}>{siswa && siswa.name ? siswa.name : "Loading..."}</h1>
          {Array.isArray(kelas) && kelas.length > 0 ? (
            kelas
              .filter(kelasItem => kelasItem !== null)
              .map((kelasItem, index) => (
                <div key={index} className={Styles.container2}>
                  <h3 className={Styles.title2}>Daftar Test</h3>
                  <table className={Styles.table2}>
                    <tbody>
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
                      <tr className={Styles.row2}>
                        <td className={Styles.label2}>Mulai</td>
                        <td className={Styles.value2}>{kelasItem.jadwal}</td>
                      </tr>
                      <tr className={Styles.row2}>
                        <td className={Styles.label2}>Selesai</td>
                        <td className={Styles.value2}>{kelasItem.jadwal_berakhir}</td>
                      </tr>
                      <tr className={Styles.row2}>
                        <td colSpan="2" className={Styles.buttonContainer}>
                          <Link to={`/verifikasi/${kelasItem.id}`}>
                            <button className={Styles.button2}>Kerjakan</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
          ) : (
            <div className={Styles.alertContainer}>
              <h3 className={Styles.alert}>Tidak ada Ujian saat ini</h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default Ujiansiswa;
