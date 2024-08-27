import React, { useState, useEffect, useRef } from 'react';
import styles from './Editor.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ikon from './ikon/bold.png';
import ikon1 from './ikon/underline.png';
import ikon2 from './ikon/italic.png';
import Navbar from '../../komponen/navbar/navbar';

const Editor = () => {
    const { id } = useParams();
    const [jawaban, setjawaban] = useState('');
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const textInputRef = useRef(null);
    const commandRefs = useRef({
        bold: null,
        italic: null,
        underline: null,
        insertUnorderedList: null,
        insertOrderedList: null,
        formatBlock: null
    });

    const name = id;
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [ujianList, setujianList] = useState([]);

    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/modul-read-soal/${id}`);
                setujianList(response.data);
            } catch (error) {
                console.error('Error fetching siswa data:', error);
            }
        };
        fetchSiswa();
    }, [id]);

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/modul-update-jawaban`, { name, jawaban });
            window.confirm('berhasil di update', response.data);
        } catch (error) {
            console.error("Error uploading:", error.response ? error.response.data : error.message);
        }
    };

    const toggleFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        updateActiveButtons();
    };

    const updateActiveButtons = () => {
        const commands = ['bold', 'italic', 'underline', 'insertUnorderedList', 'insertOrderedList', 'formatBlock'];
        commands.forEach(command => {
            const button = commandRefs.current[command];
            if (button) {
                const isActive = document.queryCommandState(command);
                if (isActive) {
                    button.classList.add(styles.active);
                } else {
                    button.classList.remove(styles.active);
                }
            }
        });

        const quoteButton = commandRefs.current['formatBlock'];
        if (quoteButton && document.queryCommandValue('formatBlock') === 'blockquote') {
            quoteButton.classList.add(styles.active);
        } else if (quoteButton) {
            quoteButton.classList.remove(styles.active);
        }
    };

    const previewImage = event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setPreviewImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const input = textInputRef.current;
        if (input) {
            input.addEventListener('input', updateActiveButtons);
            input.addEventListener('keyup', updateActiveButtons);
            input.addEventListener('mouseup', updateActiveButtons);
        }

        return () => {
            if (input) {
                input.removeEventListener('input', updateActiveButtons);
                input.removeEventListener('keyup', updateActiveButtons);
                input.removeEventListener('mouseup', updateActiveButtons);
            }
        };
    }, []);
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className={styles.editor}>
                <form onSubmit={handleUpload}>
                    <div className={styles.formGroup}>
                        <label htmlFor="jawaban" className={styles.label}>Pilih Jawaban:</label>
                        <select
                            id="jawaban"
                            className={styles.input}
                            value={jawaban}
                            onChange={(e) => setjawaban(e.target.value)}
                            required
                        >
                            <option value="">Pilih jawaban</option>
                            <option value="opsi_a">opsi a</option>
                            <option value="opsi_b">opsi b</option>
                            <option value="opsi_c">opsi c</option>
                            <option value="opsi_d">opsi d</option>
                            <option value="opsi_e">opsi e</option>
                        </select>
                    </div>
                    <button className="button" type="submit">Tambahkan</button>
                </form>
                <br /><br />
                <div>
                    <button className="logout" onClick={goBack}>Kembali</button>
                </div>

            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Editor;
