import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../../komponen/navbar/navbar';
import styles from './kelas.module.css';

const MapelSiswa = () => {
    const navigate = useNavigate();
    const [Listsiswa, setListsiswa] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1, name: '' });
    const { nama, kelas } = useParams();

    useEffect(() => {
        const fetchListsiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_siswa_sesi_cbt/${kelas}`);
                setListsiswa(response.data);
            } catch (error) {
                console.error('Error Cok:', error);
            }
        };
        fetchListsiswa();
    }, [kelas]);

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
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Listsiswa.map((pelajaran, index) => (
                            <tr key={pelajaran.id}>
                                <td>{index + 1}</td>
                                <td>{pelajaran.name}</td>
                                <td>
                                    <Link to={`${pelajaran.id}`}>
                                        <button
                                            type="button"
                                            className={styles.aksiButton2}
                                        >
                                            lihat Nilai
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MapelSiswa;
