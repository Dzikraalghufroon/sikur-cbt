import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar'

const InputSoal = () => {
    const [name, setName] = useState('');
    const [mapel, setmapel] = useState('');
    const navigate = useNavigate();
    const [page, setpage] = useState("");
    const [kelasList, setKelasList] = useState([]);
    const [kelas, setKelas] = useState('');
    const [banksoal, setBanksoal] = useState([]);
    const [selectedBanksoal, setSelectedBanksoal] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/tambah_banksoal`, {
                name,
                mapel
                //: selectedBanksoal
            });

            console.log(response.data);

            setName('');
            setmapel('');

            alert('Data berhasil ditambahkan!');
            navigate('/banksoal');
        } catch (error) {
            console.error('Error adding data:', error);
            alert('Gagal menambahkan data. Silakan coba lagi.');
        }
    };

    const [siswaList, setSiswaList] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1, name: '', mapel: '' });

    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_banksoal`)//('http://localhost:2000/read-soal');
                setSiswaList(response.data);
            } catch (error) {
                console.error('Error fetching siswa data:', error);
            }
        };
        fetchSiswa();
    }, []);

    const handleEdit = (id, name, mapel) => {
        setCurrentEdit({ id, name, mapel });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/update_banksoal`, {
                id: currentEdit.id,
                name: currentEdit.name,
                mapel: currentEdit.mapel
            });
            if (response.data.stat) {
                setSiswaList(siswaList.map(siswa =>
                    siswa.id === currentEdit.id ? { ...siswa, name: currentEdit.name, mapel: currentEdit.mapel } : siswa
                ));
                setCurrentEdit({ id: -1, name: '', mapel: '' });
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
                const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete_banksoal/${id}`);//(`http://localhost:2000/banksoal/${id}`);
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

    /////////

    useEffect(() => {

        const fetchKelas = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_banksoal`);//('http://localhost:2000/read-soal');
                setKelasList(response.data);
            } catch (error) {
                console.error('Error fetching kelas data', error);
            }
        };

        fetchKelas();
    }, []);


    useEffect(() => {
        const fetchBanksoal = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_mapel_sesi`);
                setBanksoal(response.data);
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
            <div className={styles.containerTambah}>
                <h2>Form menambah Bank Soal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Nama Soal &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Deskripsi &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
                        <input type="text" value={mapel} onChange={(e) => setmapel(e.target.value)} required />
                    </div>
                    {/* <div className={styles.formGroup}>
                        <label htmlFor="banksoal" className={styles.label}>Ujian:</label>
                        <select
                            id="banksoal"
                            className={styles.input}
                            value={selectedBanksoal}
                            onChange={(e) => setSelectedBanksoal(e.target.value)}
                            required
                        >
                            <option value="">Pilih ujian</option>
                            {banksoal.map((banksoalItem) => (
                                <option key={banksoalItem.id} value={banksoalItem.name}>
                                    {banksoalItem.mapel}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
            <div className={styles.container}>
                <div>

                </div>
                <h2 className={styles.heading}>Tabel Bank Soal</h2>
                <div className={styles.formGroup}>


                    <label htmlFor="kelas" className={styles.label}></label>
                    <select
                        id="kelas"
                        className={styles.input}
                        value={page}
                        onChange={(e) => setpage(e.target.value)}
                        required
                    >
                        <option value="">Pilih Bank soal</option>
                        {kelasList.map((kelasItem) => (
                            <option key={kelasItem.id} value={kelasItem.name}>
                                {kelasItem.name}
                            </option>
                        ))}
                    </select>
                    <Link to={`/banksoal/${page}`}>
                        <button className={styles.button}>Buat Soal</button>
                    </Link>
                </div><br /><br /><br /><br />
                <table className={styles.siswaTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>No</th>
                            <th className={styles.tableHeader}>Nama Bank Soal</th>
                            <th className={styles.tableHeader}>mapel Soal</th>
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
                                        {/* <select
                                            id="banksoal"
                                            className={styles.input}
                                            value={currentEdit.mapel}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, mapel: e.target.value })}
                                            required
                                        >
                                            <option value="">Pilih ujian</option>
                                            {banksoal.map((banksoalItem) => (
                                                <option key={banksoalItem.id} value={banksoalItem.name}>
                                                    {banksoalItem.mapel}
                                                </option>
                                            ))}
                                        </select> */}
                                        <input
                                            type="text"
                                            value={currentEdit.mapel}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, mapel: e.target.value })}
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
                                    <td>{siswa.mapel}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className={styles.editButton}
                                            onClick={() => handleEdit(siswa.id, siswa.name, siswa.mapel, siswa.kelas, siswa.jenisKelamin, siswa.password)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(siswa.name)}
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

export default InputSoal;
