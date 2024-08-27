import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../komponen/navbar/navbar';
import styles from './setting.module.css';

const Mapel = () => {
    const navigate = useNavigate();
    const [mataPelajaran, setMataPelajaran] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1, name: '' });


    useEffect(() => {
        const fetchMataPelajaran = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_mapel`);//
                setMataPelajaran(response.data);
            } catch (error) {
                console.error('Error Cok:', error);
            }
        };
        fetchMataPelajaran();
    }, []);

    const handleEdit = (id, name) => {
        setCurrentEdit({ id, name });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/update_mapel`, currentEdit);
            if (response.data.stat) {
                setMataPelajaran(mataPelajaran.map(mp =>
                    mp.id === currentEdit.id ? { ...mp, nama: currentEdit.name } : mp
                ));
                setCurrentEdit({ id: -1, name: '' });
            } else {
                console.error('Error ngupdate data:', response.data.text);
            }
        } catch (error) {
            console.error('Error update data:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('YAkiN KaH deK?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete_mapel/${id}`)//(`http://localhost:2000/mapel/${id}`);
                if (response.status === 200) {
                    setMataPelajaran(mataPelajaran.filter(mp => mp.id !== id));
                } else {
                    console.error('Error lagi data:', response.data.text);
                }
            } catch (error) {
                console.error('Error cok:', error);
            }
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            

            <div className={styles.container}>
            <div className={styles.tambah}>
                <Link to="/mapel/tambah" className={styles.abutton}>Tambah Data</Link>
            </div>
                <h2>Tabel Mata Pelajaran</h2>
                <table className={styles.pelajaranTable}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Mata Pelajaran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mataPelajaran.map((pelajaran, index) => (
                            currentEdit.id === pelajaran.id ? (
                                <tr key={pelajaran.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={currentEdit.name}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, name: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <button type="submit" className={styles.aksiButton} onClick={(e) => handleUpdate(e)}>Update</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={pelajaran.id}>
                                    <td>{index + 1}</td>
                                    <td>{pelajaran.nama}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className={styles.aksiButton}
                                            onClick={() => handleEdit(pelajaran.id, pelajaran.nama)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.aksiButton2}
                                            onClick={() => handleDelete(pelajaran.id)}
                                        >
                                            Hapus
                                        </button>
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

export default Mapel;
