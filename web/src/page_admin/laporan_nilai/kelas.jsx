import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../../komponen/navbar/navbar';
import styles from './kelas.module.css';

const KelasSiswa = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [ListSesiSiswa, setListSesiSiswa] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1, name: '' });
    const { kelas } = useParams();


    useEffect(() => {
        const fetchListSesiSiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_siswa_kelas/${kelas}`)//('http://localhost:2000/read-kelas');
                setListSesiSiswa(response.data);
            } catch (error) {
                console.error('Error Cok:', error);
            }
        };
        fetchListSesiSiswa();
    }, [kelas]);


    return (
        <div>
            <Navbar></Navbar>


            <div className={styles.container}>
                <div className={styles.tambah}>
                    <button className={styles.abutton} onClick={() => navigate(-1)}>← Kembali</button>
                </div>
                <h2>Nama siswa</h2>
                <table className={styles.pelajaranTable}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListSesiSiswa.map((pelajaran, index) => (
                            (
                                <tr key={pelajaran.id}>
                                    <td>{index + 1}</td>
                                    <td>{pelajaran.name}</td>
                                    <td>
                                        <Link to={`${pelajaran.name}`}>
                                            <button
                                                type="button"
                                                className={styles.aksiButton2}
                                            >
                                                lihat Nilai
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KelasSiswa;
