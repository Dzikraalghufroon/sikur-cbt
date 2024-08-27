import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar';

const Siswa = () => {
    const [siswaList, setSiswaList] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1, status: 0, jadwal: '', jadwal_berakhir: '' });

    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_sesi`);
                setSiswaList(response.data);
            } catch (error) {
                console.error('Error fetching siswa data:', error);
            }
        };
        fetchSiswa();
    }, []);

    const handleEdit = (id, status, jadwal, jadwal_berakhir) => {
        setCurrentEdit({ id, status, jadwal, jadwal_berakhir });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/update_sesi`, currentEdit);
            if (response.data.stat) {
                setSiswaList(siswaList.map(siswa =>
                    siswa.id === currentEdit.id ? { ...siswa, status: currentEdit.status, jadwal: currentEdit.jadwal, jadwal_berakhir: currentEdit.jadwal_berakhir } : siswa
                ));
                setCurrentEdit({ id: -1, status: 0, jadwal: '', jadwal_berakhir: '' });
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
                const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete_sesi/${id}`);
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
            <Navbar />
            <div className={styles.tambah}>
                <Link to="/sesi/tambah" className={styles.abutton}>Tambah Data</Link>
            </div>

            <div className={styles.container}>
                <h2 className={styles.heading}>Tabel Siswa</h2>
                <table className={styles.siswaTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>No</th>
                            <th className={styles.tableHeader}>Nama</th>
                            <th className={styles.tableHeader}>Mata Pelajaran</th>
                            <th className={styles.tableHeader}>Kelas</th>
                            <th className={styles.tableHeader}>Status</th>
                            <th className={styles.tableHeader}>Jadwal</th>
                            <th className={styles.tableHeader}>Jadwal Berakhir</th>
                            <th className={styles.tableHeader}>Durasi</th>
                            <th className={styles.tableHeader}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswaList.map((siswa, index) => (
                            currentEdit.id === siswa.id ? (
                                <tr key={siswa.id}>
                                    <td>{index + 1}</td>
                                    <td>{siswa.name}</td>
                                    <td>{siswa.bank_soal}</td>
                                    <td>{siswa.kelas}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={currentEdit.status === 1}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, status: e.target.checked ? 1 : 0 })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            value={currentEdit.jadwal}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, jadwal: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='datetime-local'
                                            value={currentEdit.jadwal_berakhir}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, jadwal_berakhir: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </td>
                                    <td>{siswa.durasi}</td>
                                    <td>
                                        <button type="submit" className={styles.updateButton} onClick={handleUpdate}>Update</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={siswa.id}>
                                    <td>{index + 1}</td>
                                    <td>{siswa.name}</td>
                                    <td>{siswa.bank_soal}</td>
                                    <td>{siswa.kelas}</td>
                                    <td>{siswa.status === 1 ? 'Aktif' : 'Tidak Aktif'}</td>
                                    <td>{siswa.jadwal}</td>
                                    <td>{siswa.jadwal_berakhir}</td>
                                    <td>{siswa.durasi}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className={styles.editButton}
                                            onClick={() => handleEdit(siswa.id, siswa.status, siswa.jadwal, siswa.jadwal_berakhir)}
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






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import styles from './setting.module.css';
// import Navbar from '../../komponen/navbar/navbar';

// const Siswa = () => {
//     const navigate = useNavigate();
//     const [siswaList, setSiswaList] = useState([]);
//     const [currentEdit, setCurrentEdit] = useState({ id: -1, name: '', banksoal: '', status: 0, jadwal: '', durasi: '', kelas: '' });

//     useEffect(() => {
//         const fetchSiswa = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_sesi`)
//                 setSiswaList(response.data);
//             } catch (error) {
//                 console.error('Error fetching siswa data:', error);
//             }
//         };
//         fetchSiswa();
//     }, []);

//     const handleEdit = (id, name, banksoal, status, jadwal, durasi, kelas) => {
//         setCurrentEdit({ id, name, banksoal, status, jadwal, durasi, kelas });
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`${import.meta.env.VITE_SERVER}/update_sesi`, currentEdit);
//             if (response.data.stat) {
//                 setSiswaList(siswaList.map(siswa =>
//                     siswa.id === currentEdit.id ? { ...siswa, ...currentEdit } : siswa
//                 ));
//                 setCurrentEdit({ id: -1, name: '', banksoal: '', status: 0, jadwal: '', durasi: '', kelas: '' });
//             } else {
//                 console.error('Error updating data:', response.data.text);
//             }
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
//         if (confirmDelete) {
//             try {
//                 const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete_sesi/${id}`);
//                 if (response.status === 200) {
//                     setSiswaList(siswaList.filter(siswa => siswa.id !== id));
//                 } else {
//                     console.error('Error deleting data:', response.data.text);
//                 }
//             } catch (error) {
//                 console.error('Error deleting data:', error);
//             }
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className={styles.tambah}>
//                 <Link to="/sesi/tambah" className={styles.abutton}>Tambah Data</Link>
//             </div>

//             <div className={styles.container}>
//                 <h2 className={styles.heading}>Tabel Siswa</h2>
//                 <table className={styles.siswaTable}>
//                     <thead>
//                         <tr>
//                             <th className={styles.tableHeader}>No</th>
//                             <th className={styles.tableHeader}>Nama</th>
//                             <th className={styles.tableHeader}>Bank Soal</th>
//                             <th className={styles.tableHeader}>Kelas</th>
//                             <th className={styles.tableHeader}>Status</th>
//                             <th className={styles.tableHeader}>Jadwal</th>
//                             <th className={styles.tableHeader}>Durasi</th>
//                             <th className={styles.tableHeader}>Aksi</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {siswaList.map((siswa, index) => (
//                             currentEdit.id === siswa.id ? (
//                                 <tr key={siswa.id}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             value={currentEdit.name}
//                                             onChange={(e) => setCurrentEdit({ ...currentEdit, name: e.target.value })}
//                                             className={styles.inputField}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             value={currentEdit.banksoal}
//                                             onChange={(e) => setCurrentEdit({ ...currentEdit, banksoal: e.target.value })}
//                                             className={styles.inputField}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             value={currentEdit.kelas}
//                                             onChange={(e) => setCurrentEdit({ ...currentEdit, kelas: e.target.value })}
//                                             className={styles.inputField}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="checkbox"
//                                             checked={currentEdit.status === 1}
//                                             onChange={(e) => setCurrentEdit({ ...currentEdit, status: e.target.checked ? 1 : 0 })}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             value={currentEdit.jadwal}
//                                             onChange={(e) => setCurrentEdit({ ...currentEdit, jadwal: e.target.value })}
//                                             className={styles.inputField}
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="number"
//                                             value={currentEdit.durasi}
//                                             onChange={(e) => setCurrentEdit({ ...currentEdit, durasi: e.target.value })}
//                                             className={styles.inputField}
//                                         />
//                                     </td>
//                                     <td>
//                                         <button type="submit" className={styles.updateButton} onClick={handleUpdate}>Update</button>
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 <tr key={siswa.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{siswa.name}</td>
//                                     <td>{siswa.bank_soal}</td>
//                                     <td>{siswa.kelas}</td>
//                                     <td>{siswa.status === 1 ? 'Aktif' : 'Tidak Aktif'}</td>
//                                     <td>{siswa.jadwal}</td>
//                                     <td>{siswa.durasi}</td>
//                                     <td>
//                                         <button
//                                             type="button"
//                                             className={styles.editButton}
//                                             onClick={() => handleEdit(siswa.id, siswa.name, siswa.banksoal, siswa.status, siswa.jadwal, siswa.durasi, siswa.kelas)}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className={styles.deleteButton}
//                                             onClick={() => handleDelete(siswa.id)}
//                                         >
//                                             Hapus
//                                         </button>
//                                     </td>
//                                 </tr>
//                             )
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Siswa;
