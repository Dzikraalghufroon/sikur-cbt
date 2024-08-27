// Import necessary modules
import React, { useState, useEffect, useRef } from 'react';
import styles from './Editor.module.css';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ikon from './ikon/bold.png';
import ikon1 from './ikon/underline.png';
import ikon2 from './ikon/italic.png';
import Navbar from '../../komponen/navbar/navbar';

const Editor = () => {
    const { id } = useParams();
    const [soal, setSoal] = useState('');
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const textInputRef = useRef(null);
    const name = id;
    const [ujianList, setujianList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/modul-edit-soal/${name}`);
                setujianList(response.data);
                console.log("ado cok", response.data)
            } catch (error) {
                console.error('Error fetching siswa data:', error);
            }
        };
        fetchSiswa();
    }, [id]);


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
                <input type="file" accept="image/*" onChange={previewImage} />
            </div>
            {previewImageUrl && <div className={styles.previewImageContainer}><img src={previewImageUrl} alt="Preview" /></div>}
        </div>
    );



    return (
        <div>
            <Navbar></Navbar>
            <br />
            <br />
            <br />
            <br />
            <div className={styles.siswaTable}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>← Kembali</button>
                <table>
                    <tbody>
                        <tr>
                            <th className={styles.tableHeader} >ID</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.id}</td>
                                </tr>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >Bank Soal</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.banksoal}</td>
                                </tr>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >File Soal</th>{ujianList.map((siswa) => (

                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.filesoal}</td>
                                </tr><br /><br /><br /><br /><Link to={`/editbanksoal/filesoal/${siswa.id}`}>
                                        <button className={styles.button2}>Tambahkan / Edit Gambar</button>
                                    </Link>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >Soal</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td dangerouslySetInnerHTML={{ __html: siswa.soal }}></td>
                                </tr><br /><br /><br /><br /><Link to={`/editbanksoal/soal/${siswa.id}`}>
                                        <button className={styles.button2}>Edit Soal</button>
                                    </Link>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >opsi a</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td dangerouslySetInnerHTML={{ __html: siswa.opsi_a }}></td>
                                </tr><br /><br /><br /><br /><Link to={`/editbanksoal/opsi_a/${siswa.id}`}>
                                        <button className={styles.button2}>Edit Soal</button>
                                    </Link>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >opsi b</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td dangerouslySetInnerHTML={{ __html: siswa.opsi_b }}></td>

                                </tr><br /><br /><br /><br />
                                    <Link to={`/editbanksoal/opsi_b/${siswa.id}`}>
                                        <button className={styles.button2}>Edit Soal</button>
                                    </Link>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >opsi c</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td dangerouslySetInnerHTML={{ __html: siswa.opsi_c }}></td>

                                </tr><br /><br /><br /><br /><Link to={`/editbanksoal/opsi_c/${siswa.id}`}>
                                        <button className={styles.button2}>Edit Soal</button>
                                    </Link>
                                </th>
                            ))}

                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >opsi d</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td dangerouslySetInnerHTML={{ __html: siswa.opsi_d }}></td>
                                </tr><br /><br /><br /><br /><Link to={`/editbanksoal/opsi_d/${siswa.id}`}>
                                        <button className={styles.button2}>Edit Soal</button>
                                    </Link>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >opsi e</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td dangerouslySetInnerHTML={{ __html: siswa.opsi_e }}></td>
                                </tr><br /><br /><br /><br /><Link to={`/editbanksoal/opsi_e/${siswa.id}`}>
                                        <button className={styles.button2}>Edit Soal</button>
                                    </Link>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >file opsi a</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.file_a}</td>
                                    <br /><br /><br /><br /><Link to={`/editbanksoal/file_a/${siswa.id}`}>
                                        <button className={styles.button2}>Tambahkan / Edit Gambar</button>
                                    </Link>
                                </tr>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >file opsi b</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.file_b}</td>
                                    <br /><br /><br /><br /><Link to={`/editbanksoal/file_b/${siswa.id}`}>
                                        <button className={styles.button2}>Tambahkan / Edit Gambar</button>
                                    </Link>
                                </tr>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >file opsi c</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.file_c}</td>
                                    <br /><br /><br /><br /><Link to={`/editbanksoal/file_c/${siswa.id}`}>
                                        <button className={styles.button2}>Tambahkan / Edit Gambar</button>
                                    </Link>
                                </tr>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >file opsi d</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.file_d}</td>
                                    <br /><br /><br /><br /><Link to={`/editbanksoal/file_d/${siswa.id}`}>
                                        <button className={styles.button2}>Tambahkan / Edit Gambar</button>
                                    </Link>
                                </tr>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >file opsi e</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td>{siswa.file_e}</td>
                                    <br /><br /><br /><br /><Link to={`/editbanksoal/file_e/${siswa.id}`}>
                                        <button className={styles.button2}>Tambahkan / Edit Gambar</button>
                                    </Link>
                                </tr>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className={styles.tableHeader} >Jawaban</th>{ujianList.map((siswa) => (
                                <th className={styles.tableHeaderedit}><tr key={siswa.id}>
                                    <td className={styles.jawaban}>                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{siswa.jawaban}                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>

                                    <Link to={`/editbanksoal/jawaban/${siswa.id}`}>
                                        <button className={styles.button2}>Edit </button>
                                    </Link>
                                </tr>
                                </th>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <button className={styles.backButton} onClick={() => navigate(-1)}>← Kembali</button>
            </div>
            <br /><br /><br /><br />
        </div>
    );
};

export default Editor;
