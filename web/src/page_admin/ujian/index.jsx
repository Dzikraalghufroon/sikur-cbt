import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar';

const Siswa = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [siswaList, setSiswaList] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1,  mapel: '',banksoal: '', kelas: '', deskripsi: '', acakSoal: 0, acakJawaban: 0, nilai: '', durasi: '' });


    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_ujian`)//('http://localhost:2000/read-ujian');
                setSiswaList(response.data);
            } catch (error) {
                console.error('Error fetching siswa data:', error);
            }
        };
        fetchSiswa();
    }, []);

    const handleEdit = (id,  mapel,banksoal, kelas, deskripsi, acakSoal, acakJawaban, nilai, durasi) => {
        setCurrentEdit({ id,  mapel,banksoal, kelas, deskripsi, acakSoal, acakJawaban, nilai, durasi });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/update_ujian`, currentEdit);//('http://localhost:2000/siswa', currentEdit);
            if (response.data.stat) {
                setSiswaList(siswaList.map(siswa =>
                    siswa.id === currentEdit.id ? { ...siswa, banksoal: currentEdit.banksoal, mapel: currentEdit.mapel, kelas: currentEdit.kelas, deskripsi: currentEdit.deskripsi, acakSoal: currentEdit.acakSoal, acakJawaban: currentEdit.acakJawaban, nilai: currentEdit.nilai, durasi: currentEdit.durasi } : siswa
                ));
                setCurrentEdit({ id: -1,  mapel: '',banksoal: '', kelas: '', deskripsi: '', acakSoal: 0, acakJawaban: 0, nilai: '', durasi: '' });
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
                const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete_ujian/${id}`)//(`http://localhost:2000/siswa/${id}`);
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
    

    return (
        <div>
            <Navbar></Navbar>
            

            <div className={styles.container}>
            <div className={styles.tambah}>
                <Link to="/ujian/tambah" className={styles.abutton}>Tambah Data</Link>
            </div>
                <h2 className={styles.heading}>Tabel Siswa</h2>
                <table className={styles.siswaTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>No</th>
                            <th className={styles.tableHeader}>Mata pelajaran</th>
                            <th className={styles.tableHeader}>Bank soal</th>
                            <th className={styles.tableHeader}>Kelas</th>
                            <th className={styles.tableHeader}>Deskripsi</th>
                            {/* <th className={styles.tableHeader}>Acak Soal</th>
                            <th className={styles.tableHeader}>Acak Jawaban</th>
                            <th className={styles.tableHeader}>Nilai</th> */}
                            <th className={styles.tableHeader}>Durasi</th>
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
                                            value={currentEdit.mapel}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, mapel: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={currentEdit.banksoal}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, banksoal: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={currentEdit.kelas}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, kelas: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={currentEdit.deskripsi}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, deskripsi: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    {/*<td>
                                         <input
                                            type="checkbox"
                                            checked={currentEdit.acakSoal === 1}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, acakSoal: e.target.checked ? 1 : 0 })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={currentEdit.acakJawaban === 1}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, acakJawaban: e.target.checked ? 1 : 0 })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={currentEdit.nilai === 1}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, nilai: e.target.checked ? 1 : 0 })}
                                        />
                                    </td> */}
                                    <td>
                                        <input
                                            type="number"
                                            value={currentEdit.durasi}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, durasi: e.target.value })}
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
                                    <td>{siswa.mapel}</td>
                                    <td>{siswa.banksoal}</td>
                                    <td>{siswa.kelas}</td>
                                    <td>{siswa.deskripsi}</td>
                                    {/* <td>{siswa.acakSoal === 1 ? 'Ya' : 'Tidak'}</td>
                                    <td>{siswa.acakJawaban === 1 ? 'Ya' : 'Tidak'}</td>
                                    <td>{siswa.nilai === 1 ? 'Ya' : 'Tidak'}</td> */}
                                    <td>{siswa.durasi}</td>
                                    <td>
                                        <a href="ujian/soal" className={styles.editButton}>+</a>
                                        {/* <button
                                            type="button"
                                            className={styles.editButton}
                                            onClick={() => handleEdit(siswa.id, siswa.name, siswa.mapel, siswa.kelas, siswa.deskripsi, siswa.acakSoal, siswa.acakJawaban, siswa.nilai, siswa.durasi)}
                                        >
                                            Edit
                                        </button> */}
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
