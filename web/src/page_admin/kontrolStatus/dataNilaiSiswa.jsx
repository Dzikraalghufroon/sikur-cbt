import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../../komponen/navbar/navbar';
import styles from './kelas.module.css';
import ConfirmModal from '../../page_siswa/komponen/popup/ConfirmModal';

const DataNilaiStatus = () => {
    const navigate = useNavigate();
    const [Listsiswa, setListsiswa] = useState([]);
    const [namaSesi, setnamaSesi] = useState(null);
    const { nama, kelas, sesi } = useParams();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchListsiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_siswa_nilai2/${kelas}/${nama}/${sesi}`);
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
    const handleConfirm = async () => {  
        setShowConfirmModal(false);          
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/delete_Status_ujian/${kelas}/${nama}/${sesi}`);
            if (response.status === 200) {
                alert("sukses")
                navigate(`/status/ujian/${kelas}/${nama}/${sesi}`)
            } else {
                console.error('Error deleting data:', response.data.text);
            }
        } catch (error) {
            console.error('Error Cok:', error);
            setListsiswa([]);
        }

    };
    const hapus = () => {
        setShowConfirmModal(true);
    }

    // const handleConfirm = () => {
    //     setShowConfirmModal(false);
        
    // };

    const handleCancel = () => {
        setShowConfirmModal(false);
    };

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
                                    <td><button className={styles.aksiButton2} onClick={hapus}>Hapus</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">DATA KOSONG.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ConfirmModal
                show={showConfirmModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Apakah Anda yakin ingin menghapus?"
            />
        </div>
    );
};

export default DataNilaiStatus;
