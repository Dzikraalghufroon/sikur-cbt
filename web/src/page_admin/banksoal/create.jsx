import React, { useState, useEffect, useRef } from 'react';
import styles from './Editor.module.css';
import axios from 'axios';
import { useParams, useNavigate , Link} from 'react-router-dom';
import ikon from './ikon/bold.png';
import ikon1 from './ikon/underline.png';
import ikon2 from './ikon/italic.png';
import Navbar from '../../komponen/navbar/navbar';

const Editor = () => {
    const { id } = useParams();
    const [soal, setSoal] = useState('');
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const textInputRef = useRef(null);
    const opsiARef = useRef(null);
    const opsiBRef = useRef(null);
    const opsiCRef = useRef(null);
    const opsiDRef = useRef(null);
    const opsiERef = useRef(null);
    //const opsijawabanRef = useRef(null);
    const [opsi_a, setOpsi_a] = useState('');
    const [opsi_b, setOpsi_b] = useState('');
    const [opsi_c, setOpsi_c] = useState('');
    const [opsi_d, setOpsi_d] = useState('');
    const [opsi_e, setOpsi_e] = useState('');
    const [jawaban, setJawaban] = useState('');
    const name = id;
    const navigate = useNavigate();
   // const [userData, setUserData] = useState(null);

    

    const handleUpload = async (e) => {
        //e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/modul-input-soal`, { name, soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban });
            console.log("Berhasil diupload:", response.data);
        } catch (error) {
            console.log("gagal");
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

    const commandRefs = useRef({
        bold: null,
        italic: null,
        underline: null,
        insertUnorderedList: null,
        insertOrderedList: null,
        formatBlock: null
    });

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
                {/* <input type="file" accept="image/*" onChange={previewImage} /> */}
            </div>
            {previewImageUrl && <div className={styles.previewImageContainer}><img src={previewImageUrl} alt="Preview" /></div>}
        </div>
    );

    //////////////////////////////////////////////////////////////////////////////ujianData

    const [ujianData, setujianData] = useState(null);
    const [ujianList, setujianList] = useState([]);
    const [currentEdit, setCurrentEdit] = useState({ id: -1, name: '', jumlah: '' });

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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_SERVER}/modul-delete-soal/${id}`);
                if (response.status === 200) {
                    setujianList(ujianList.filter(siswa => siswa.id !== id));
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
            <div className={styles.editor}>
                <form onSubmit={handleUpload}>
                    <h2>Masukkan soal</h2>
                    {renderEditor(textInputRef, setSoal, "Ketik teks di sini...")}

                    <h2>Masukkan untuk opsi a</h2>
                    {renderEditor(opsiARef, setOpsi_a, "Ketik teks di sini...")}

                    <h2>Masukkan untuk opsi b</h2>
                    {renderEditor(opsiBRef, setOpsi_b, "Ketik teks di sini...")}

                    <h2>Masukkan untuk opsi c</h2>
                    {renderEditor(opsiCRef, setOpsi_c, "Ketik teks di sini...")}

                    <h2>Masukkan untuk opsi d</h2>
                    {renderEditor(opsiDRef, setOpsi_d, "Ketik teks di sini...")}

                    <h2>Masukkan untuk opsi e</h2>
                    {renderEditor(opsiERef, setOpsi_e, "Ketik teks di sini...")}

                    <h2>Masukkan jawaban yang benar</h2>
                    <h2>Masukkan Jawaban</h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="jawaban" className={styles.label}>Pilih Jawaban:</label>
                        <select
                            id="jawaban"
                            className={styles.input}
                            value={jawaban}
                            onChange={(e) => setJawaban(e.target.value)}
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
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className={styles.siswaTable}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader} >No</th>
                            <th className={styles.tableHeader} >Bank Soal</th>
                            <th className={styles.tableHeader} >File Soal</th>
                            <th className={styles.tableHeader} >Soal</th>
                            <th className={styles.tableHeader} >Aksi</th>
                        </tr>
                    </thead>
                    <tbody>

                        {ujianList.map((siswa, index) => (
                            <tr key={siswa.id}>

                                <td>{index + 1}</td>
                                <td>{siswa.banksoal}</td>
                                <td>{siswa.filesoal}</td>
                                <td dangerouslySetInnerHTML={{ __html: siswa.soal }} className={styles.panjang_kotak}></td>
                                <td>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(siswa.id)}>Hapus</button>
                                    <Link to={`/banksoal/${id}/${siswa.id}`}>
                                        <button className={styles.updateButton}>Edit Soal</button>
                                    </Link>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br /><br /><br /><br />

            <br /><br /><br /><br /><br />
            
        </div>
    );
};

export default Editor;
