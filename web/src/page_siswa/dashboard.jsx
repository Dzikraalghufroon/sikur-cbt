import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ImportSoal = () => {
    const [topik, setTopik] = useState([]);
    const [selectedTopik, setSelectedTopik] = useState(null);
    const [importSoal, setImportSoal] = useState('');
    const [konfirmasiSoal, setKonfirmasiSoal] = useState('');
    const [soalList, setSoalList] = useState([]);
    const [isKonfirmasiVisible, setIsKonfirmasiVisible] = useState(false);

    // useEffect(() => {
    //     // Fetch the topics when the component mounts
    //     axios.get('/api/get-topik')
    //         .then(response => setTopik(response.data))
    //         .catch(error => console.error(error));
    // }, []);

    const handleImportSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/import', { import_soal: importSoal, topik: selectedTopik.value })
            .then(response => {
                const { soal, status } = response.data;
                if (status === 1) {
                    setKonfirmasiSoal(importSoal);
                    setSoalList(soal);
                    setIsKonfirmasiVisible(true);
                } else {
                    alert('Error: ' + response.data.pesan);
                }
            })
            .catch(error => console.error('Error importing soal:', error));
    };

    const handleKonfirmasiSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/konfirmasi', { konfirmasi_import_soal: konfirmasiSoal, konfirmasi_topik: selectedTopik.value })
            .then(response => {
                const { counter_soal, counter_jawaban, status } = response.data;
                if (status === 1) {
                    alert(`Import successful: ${counter_soal} questions, ${counter_jawaban} answers.`);
                    setIsKonfirmasiVisible(false);
                } else {
                    alert('Error: ' + response.data.pesan);
                }
            })
            .catch(error => console.error('Error confirming soal:', error));
    };

    return (
        <div>
            {/* Content Header */}
            <section className="content-header">
                <h1>
                    Mengimport Soal dari Word
                    <small>Melakukan Import Soal pilihan ganda berdasarkan modul dan topik</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="/"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li className="active">Import Soal Word</li>
                </ol>
            </section>

            {/* Main content */}
            <section className="content">
                <div className="row" id="box-awal">
                    <form onSubmit={handleImportSubmit}>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="box-header with-border">
                                    <div className="box-title">Pilih Topik</div>
                                </div>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>Pilih Topik</label>
                                        <Select
                                            options={topik.map(t => ({ value: t.id, label: t.name }))}
                                            onChange={setSelectedTopik}
                                            value={selectedTopik}
                                            placeholder="Select topik"
                                        />
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <p>Pilih terlebih dahulu Topik yang akan digunakan sebelum melakukan import soal</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="box">
                                <div className="box-header with-border">
                                    <div className="box-title">Import Soal dari Word</div>
                                    <div className="box-tools pull-right">
                                        <div className="dropdown pull-right">
                                            <a href="/public/form/form-soal-ganda.docx">Form Word Soal Pilihan Ganda</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <span id="form-pesan"></span>
                                    <div className="form-group">
                                        <label>Data Soal sesuai Format Pilihan Ganda</label>
                                        <input type="hidden" name="import-soal" id="import-soal" />
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={importSoal}
                                            onChange={(event, editor) => setImportSoal(editor.getData())}
                                        />
                                        <p className="help-block">
                                            Paste Tabel pada file Word sesuai format yang telah ditentukan untuk proses import.<br/>
                                            Jangan sertakan baris kosong dalam format import soal yang akan dicopy, karena akan mengganggu hasil import soal.<br />
                                            Buat tampilan menjadi Fullscreen untuk mempermudah dalam melakukan paste ke layar.
                                        </p>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-primary pull-right" id="import">Import</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Confirmation section */}
                {isKonfirmasiVisible && (
                    <div className="row" id="box-konfirmasi">
                        <div className="col-md-12">
                            <form onSubmit={handleKonfirmasiSubmit}>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <div className="box-title">Konfirmasi Daftar Soal <span id="judul-daftar-soal">{selectedTopik ? `: ${selectedTopik.label}` : ''}</span></div>
                                    </div>
                                    <div className="box-body">
                                        <div className="callout callout-info">
                                            <h4>Konfirmasi</h4>
                                            <p>Silahkan cek soal pilihan ganda yang telah dikirim. Jika soal sudah sesuai, silahkan klik tombol Simpan dibawah ini.</p>
                                            <input type="hidden" name="konfirmasi-import-soal" id="konfirmasi-import-soal" value={konfirmasiSoal} />
                                            <input type="hidden" name="konfirmasi-topik" id="konfirmasi-topik" value={selectedTopik ? selectedTopik.value : ''} />
                                        </div>
                                        <span id="form-pesan-konfirmasi"></span>
                                        <div id="daftar-soal" style={{ overflowY: 'auto', height: '500px' }}>
                                            {/* Display list of questions here */}
                                            {soalList.map((soal, index) => (
                                                <div key={index}>{soal}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button type="button" className="btn btn-default" id="batal" onClick={() => setIsKonfirmasiVisible(false)}>Batal</button>
                                        <button type="submit" className="btn btn-primary pull-right" id="btn-konfirmasi">Simpan</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>

            {/* Modal for success */}
            {/* The modals and other elements can be managed using a state or another library for better integration */}
        </div>
    );
};

export default ImportSoal;
