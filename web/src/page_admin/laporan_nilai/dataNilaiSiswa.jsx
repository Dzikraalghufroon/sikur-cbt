import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../../komponen/navbar/navbar';
import styles from './kelas.module.css';

const DataNilaiSiswa = () => {
    const navigate = useNavigate();
    const [Listsiswa, setListsiswa] = useState([]);
    const [namaSesi, setnamaSesi] = useState(null);
    const { nama, kelas, sesi } = useParams();

    useEffect(() => {
        const fetchListsiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_siswa_nilai/${kelas}/${nama}/${sesi}`);
                setListsiswa(response.data.length ? response.data : []);
            } catch (error) {
                console.error('Error Cok:', error);
                setListsiswa([]);
            }
        };
        fetchListsiswa();
    }, [nama, kelas, sesi]);

    useEffect(() => {
        const fetchnamaSesi = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_siswa_sesi_sekarang/${sesi}`);
                setnamaSesi(response.data);
            } catch (error) {
                console.error('Error Cok:', error);
            }
        };
        fetchnamaSesi();
    }, [sesi]);

    return (
        <div>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.tambah}>
                    <button className={styles.abutton} onClick={() => navigate(-1)}>← Kembali</button>
                </div>
                <h3>Nama siswa: {nama}</h3><br /><br />

                <table className={styles.pelajaranTable}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama sesi</th>
                            <th>Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Listsiswa.length > 0 ? (
                            Listsiswa.map((pelajaran, index) => (
                                <tr key={pelajaran.id}>
                                    <td>{index + 1}</td>
                                    <td>{namaSesi ? namaSesi : 'Memuat nama sesi...'}</td>
                                    <td>{pelajaran.nilai}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Data sedang diproses, mohon refresh halaman.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataNilaiSiswa;
