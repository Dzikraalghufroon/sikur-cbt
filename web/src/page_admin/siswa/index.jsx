import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar';


const Siswa = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [siswaList, setSiswaList] = useState([]);
    const [kelas,setkelas] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1, name: '', nisn: '', kelas: '', jenisKelamin: '', password: '' });

    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_siswa`);//('http://localhost:2000/read-siswa');
                setSiswaList(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching siswa data:', error);
            }
        };
        fetchSiswa();
    }, []);

    const handleEdit = (id, name, nisn, kelas, jenisKelamin, password) => {
        setCurrentEdit({ id, name, nisn, kelas, jenisKelamin, password });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/update_siswa`, currentEdit)//('http://localhost:2000/siswa', currentEdit);
            if (response.data.stat) {
                setSiswaList(siswaList.map(siswa =>
                    siswa.id === currentEdit.id ? { ...siswa, name: currentEdit.name, nisn: currentEdit.nisn, kelas: currentEdit.kelas, jenisKelamin: currentEdit.jenisKelamin, password: currentEdit.password } : siswa
                ));
                setCurrentEdit({ id: -1, name: '', nisn: '', kelas: '', jenisKelamin: '', password: '' });
            } else {
                console.error('Error updating data:', response.data.text);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete_siswa/${id}`)//(`http://localhost:2000/siswa/${id}`);
                if (response.status === 200) {
                    setSiswaList(siswaList.filter(siswa => siswa.id !== id));
                } else {
                    console.error('Error deleting data:', response.data.text);
                }
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    };
    useEffect(() => {
        const fetchBanksoal = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_kelas`);
                setkelas(response.data);
            } catch (error) {
                console.error("Gagal mengambil data", error);
                setMessage('Gagal mengambil data');
            }
        };
        fetchBanksoal();
    }, []);

    return (
        <div>
            <Navbar></Navbar>


            <div className={styles.container}>
                <div className={styles.tambah}>
                    <Link to="/siswa/tambah" className={styles.abutton}>Tambah Data</Link>
                </div>
                <h2 className={styles.heading}>Tabel Siswa</h2>
                <table className={styles.siswaTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>No</th>
                            <th className={styles.tableHeader}>name</th>
                            <th className={styles.tableHeader}>NISN</th>
                            <th className={styles.tableHeader}>Kelas</th>
                            <th className={styles.tableHeader}>Jenis Kelamin</th>
                            <th className={styles.tableHeader}>password</th>
                            <th className={styles.tableHeader}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswaList.map((siswa, index) => (
                            currentEdit.id === siswa.id ? (
                                <tr key={siswa.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={currentEdit.name}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, name: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={currentEdit.nisn}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, nisn: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        {/* <input
                                            type="text"
                                            value={currentEdit.kelas}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, kelas: e.target.value })}
                                            className={styles.inputField}
                                        /> */}
                                        <select
                                            id="kelas"
                                            className={styles.input2}
                                            value={currentEdit.kelas}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, kelas: e.target.value })}
                                            required
                                        >
                                            <option value="">Pilih kelas</option>
                                            {kelas.map((banksoalItem) => (
                                                <option key={banksoalItem.id} value={banksoalItem.nama}>
                                                    {banksoalItem.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        {/* <input
                                            type="text"
                                            value={currentEdit.jenisKelamin}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, jenisKelamin: e.target.value })}
                                            className={styles.inputField}
                                        /> */}
                                        <select
                                            id="jenisKelamin"
                                            className={styles.input2}
                                            value={currentEdit.jenisKelamin}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, jenisKelamin: e.target.value })}
                                            required
                                        >
                                            <option value="">Pilih jenis kelamin</option>
                                            <option value="Laki-laki">Laki laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={currentEdit.password}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, password: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <button type="submit" className={styles.updateButton} onClick={(e) => handleUpdate(e)}>Update</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={siswa.id}>
                                    <td>{index + 1}</td>
                                    <td>{siswa.name}</td>
                                    <td>{siswa.nisn}</td>
                                    <td>{siswa.kelas}</td>
                                    <td>{siswa.jenisKelamin}</td>
                                    <td>{siswa.password}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className={styles.editButton}
                                            onClick={() => handleEdit(siswa.id, siswa.name, siswa.nisn, siswa.kelas, siswa.jenisKelamin, siswa.password)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(siswa.id)}
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

export default Siswa;
