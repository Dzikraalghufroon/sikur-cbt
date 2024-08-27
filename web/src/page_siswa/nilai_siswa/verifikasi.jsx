import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from './Ujian.module.css';
import Navbar from '../komponen/Navbar/navbar';
import Footer from '../komponen/footer/footer';
import { useNavigate, Link, useParams } from 'react-router-dom';

const Hasiltessiswa = () => {
    const navigate = useNavigate();
    const [siswa, setSiswa] = useState({});
    const [kelas, setKelas] = useState({});
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [status, setstatus] = useState(null);
    const [nilai, setnilai] = useState(null);

    useEffect(() => {
        const fetchSiswaData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/get`, {
                    withCredentials: true
                });
                //console.log(response.data);

                if (response.data.stat) {
                    setSiswa(response.data.data);
                } else {
                    //console.log(response.data.text);
                }
            } catch (error) {
                console.error("Error fetching siswa data:", error);
            }
        };
        fetchSiswaData();
    }, []);

    useEffect(() => {
        const fetchKelasData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/getsiswa`, {
                    withCredentials: true
                });
                //console.log(response.data);

                if (response.data.stat) {
                    setKelas(response.data.data);
                } else {
                    //console.log(response.data.text);
                }
            } catch (error) {
                console.error("Error fetching kelas data:", error);
            }
        };
        fetchKelasData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_data_siswa`, {
                    withCredentials: true
                });
                //setData(response.data)
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Expected an array, but got:', response.data);
                    setData([]);
                }
                //console.log(response.data);
            } catch (error) {
                console.error('Error fetching data2:', error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const ok = parseInt(id, 10);
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_status_ujian_siswa/${ok}`, {
                    withCredentials: true
                });
                //console.log(response.data);
                setstatus(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchStatus();
    }, [id]);


    useEffect(() => {
        const fetchNilaiData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/kalkulasi_nilai/${id}`, {
                    withCredentials: true
                });
                //console.log("kalkulasi: ", response.data)
                setnilai(response.data)

            } catch (error) {
                console.error("Error fetching nilai data:", error);
            }
        };
        fetchNilaiData();
    }, [id]);


    const kembali = () => {
        navigate(-1);
    };

    return (
        <div className={Styles.bodi}>
            <Navbar /><br /><br /><br />
            <div className={Styles.dashboard}>
                <div className={Styles.container}>

                    <button onClick={kembali} className={Styles.button2}>Kembali</button>
                    <div className={Styles.container2}>
                        <h3 className={Styles.title2}>NIlai ANDa</h3>
                        <table className={Styles.table2}>
                            <tbody>
                                <tr className={Styles.row2}>
                                    <td className={Styles.label2}>Nama</td>
                                    <td className={Styles.value2}>{siswa.name}</td>
                                </tr>
                                <tr className={Styles.row2}>
                                    <td className={Styles.label2}>Kelas</td>
                                    <td className={Styles.value2}>{kelas.name}</td>
                                </tr>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.filter(kelasItem => kelasItem === null)
                                    .map((kelasItem, index) => (
                                        <div key={index}>
                                            <tr className={Styles.row2}>
                                                <td className={Styles.label2}>NISN</td>
                                                <td className={Styles.value2}>{kelasItem.nisn}</td>
                                            </tr>
                                            <tr className={Styles.row2}>
                                                <td className={Styles.label2}>Jenis Kelamin</td>
                                                <td className={Styles.value2}>{kelasItem.jenisKelamin}</td>
                                            </tr>
                                        </div>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className={Styles.emptyMessage}>Data kosong</td>
                                    </tr>
                                )}
                                <tr className={Styles.row2}>
                                    <td className={Styles.label2}>Nilai</td>
                                    <td className={Styles.value2}>{nilai > 0 ?(nilai):("Nilai Anda Tidak ditemukan")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Hasiltessiswa;
