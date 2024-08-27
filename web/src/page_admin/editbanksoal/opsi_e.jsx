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
    const [opsi_e, setopsi_e] = useState('');
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
            const response = await axios.put(`${import.meta.env.VITE_SERVER}/modul-update-opsi_e`, { name, opsi_e });
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

    const renderEditor = (ref, setFunction, placeholder) => (
        <div>
            <div
                className={styles.content}
                ref={ref}
                contentEditable
                onInput={(e) => setFunction(e.target.innerHTML)}
                placeholder={placeholder}
            ></div>
            <div className={styles.controls}>
                <button type="button" ref={el => commandRefs.current.bold = el} onClick={() => toggleFormat('bold')}><img className={styles.ikon} src={ikon} alt="Bold" /></button>
                <button type="button" ref={el => commandRefs.current.italic = el} onClick={() => toggleFormat('italic')}><img className={styles.ikon} src={ikon2} alt="Italic" /></button>
                <button type="button" ref={el => commandRefs.current.underline = el} onClick={() => toggleFormat('underline')}><img className={styles.ikon1} src={ikon1} alt="Underline" /></button>
                <button type="button" ref={el => commandRefs.current.insertUnorderedList = el} onClick={() => toggleFormat('insertUnorderedList')}>Bullet List</button>
                <button type="button" ref={el => commandRefs.current.insertOrderedList = el} onClick={() => toggleFormat('insertOrderedList')}>Numbered List</button>
                <button type="button" ref={el => commandRefs.current.formatBlock = el} onClick={() => toggleFormat('formatBlock', 'blockquote')}>Quote</button>
                <input type="file" accept="image/*" onChange={previewImage} />
            </div>
            {previewImageUrl && <div className={styles.previewImageContainer}><img src={previewImageUrl} alt="Preview" /></div>}
        </div>
    );
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Navbar/>
            <div className={styles.editor}>
                <form onSubmit={handleUpload}>
                    <h2>Masukkan opsi_e</h2>
                    {renderEditor(textInputRef, setopsi_e, "Ketik teks di sini...")}
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
