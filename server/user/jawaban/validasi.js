const db = require("../../routes/dataBase")


const jawabansiswa5 = (req, res) => {
    const jawaban = req.body;
    const id = req.params.id;
    const nama = req.session.user.name;
    const conn = `SELECT kelas FROM siswa WHERE name = '${nama}'`;
    db.query(conn, (err, results) => {

    })

    if (!jawaban || Object.keys(jawaban).length === 0) {
        return res.status(400).json({ text: 'Jawaban tidak valid', stat: false });
    }
    const connect = `SELECT db FROM sesi_cbt WHERE id = '${id}'`
    db.query(connect, (err, hasil_result) => {
        if (err) {
            console.error("erro cok :", err);
            res.status(500).json({ error: "Database query failed" })
            return;
        }
        else {
            const nama_kolom_db = hasil_result[0].db;
            console.log(nama_kolom_db)
            const values = Object.entries(jawaban).map(([soalId]) => [parseInt(soalId)]);

            //console.log(values)
            const sql = `SELECT * FROM jawaban_siswa WHERE name= '${nama}' AND id_soal = '${values}' AND db_soal = '${id}'`;

            db.query(sql, (err, results) => {
                if (err) {
                    console.error('errror cok 2:', err);
                    res.status(500).json({ error: 'Database query failed' });
                    return;
                }
                else if (results.length > 0) {
                    //console.log("halo")
                    const idsoal = Object.entries(jawaban).map(([soalId]) => [parseInt(soalId),]);
                    const jawab = Object.entries(jawaban).map(([soalId, jawaban]) => [jawaban]);
                    //console.log(jawab)
                    const sql2 = `SELECT jawaban FROM db_soal WHERE id = '${values}'`;
                    db.query(sql2, (err, results2) => {
                        const nilai = results2[0].jawaban;
                        const opsiTerpilih = jawab[0];
                        const terpilih = opsiTerpilih[0];

                        if (nilai === terpilih) {
                            //console.log(nilai)
                            //console.log(terpilih)

                            const query = `UPDATE jawaban_siswa SET jawaban = '${jawab}', nama_db = '${nama_kolom_db}', nilai = 1 WHERE id_soal = '${idsoal}' AND name = '${nama}' AND db_soal = '${id}'`;

                            db.query(query, (err, result) => {
                                if (err) {
                                    console.error('Insert into database failed 4', err);
                                    return res.status(500).json({ text: 'Insert into database failed', stat: false });
                                }

                                res.status(200).json({
                                    text: 'Jawaban berhasil dikirim!',
                                    stat: true
                                });
                            });
                        } else {
                            //console.log(nilai)
                            //console.log(terpilih)
                            const query = `UPDATE jawaban_siswa SET jawaban = '${jawab}', nama_db = '${nama_kolom_db}', nilai = 0 WHERE id_soal = '${idsoal}' AND name = '${nama}' AND db_soal = '${id}'`;

                            db.query(query, (err, result) => {
                                if (err) {
                                    console.error('Insert into database failed 4', err);
                                    return res.status(500).json({ text: 'Insert into database failed', stat: false });
                                }

                                res.status(200).json({
                                    text: 'Jawaban berhasil dikirim!',
                                    stat: true
                                });
                            });
                        }

                    })


                }
                else {

                    //const idsoal = Object.entries(jawaban).map(([soalId]) => [parseInt(soalId),]);
                    const jawab = Object.entries(jawaban).map(([soalId, jawaban]) => [jawaban]);
                    //console.log(jawab)
                    const sql2 = `SELECT jawaban FROM db_soal WHERE id = '${values}'`;
                    db.query(sql2, (err, results2) => {
                        const nilai = results2[0].jawaban;
                        const opsiTerpilih = jawab[0];
                        const terpilih = opsiTerpilih[0];
                        if (nilai === terpilih) {
                            const query = 'INSERT INTO jawaban_siswa (name, id_soal, jawaban,db_soal, nama_db, nilai) VALUES ?';
                            const values = Object.entries(jawaban).map(([soalId, jawaban]) => [nama, parseInt(soalId), jawaban, id, nama_kolom_db, 1]);
                            // const jawab = Object.entries(jawaban).map(([soalId, jawaban]) => [jawaban]);
                            // console.log(jawab)
                            db.query(query, [values], (err, result) => {
                                if (err) {
                                    console.error('Insert into database failed', err);
                                    return res.status(500).json({ text: 'Insert into database failed', stat: false });
                                }

                                res.status(200).json({
                                    text: 'Jawaban berhasil dikirim!',
                                    stat: true
                                });
                            });
                        } else {
                            const query = 'INSERT INTO jawaban_siswa (name, id_soal, jawaban,db_soal, nama_db, nilai) VALUES ?';
                            const values = Object.entries(jawaban).map(([soalId, jawaban]) => [nama, parseInt(soalId), jawaban, id, nama_kolom_db, 0]);
                            // const jawab = Object.entries(jawaban).map(([soalId, jawaban]) => [jawaban]);
                            // console.log(jawab)
                            db.query(query, [values], (err, result) => {
                                if (err) {
                                    console.error('Insert into database failed', err);
                                    return res.status(500).json({ text: 'Insert into database failed', stat: false });
                                }

                                res.status(200).json({
                                    text: 'Jawaban berhasil dikirim!',
                                    stat: true
                                });
                            });
                        }
                    })



                }
            });


        }
    })

}
// const calculate_nilai = (req, res) => {
//     const name = req.session.user.name;
//     const kelas = req.session.user.kelas;
//     const id = req.params.id;

//     const sql1 = `SELECT nilai FROM kalkulasi_nilai WHERE name= "u" AND db_soal= 1 AND kelas= "b" `;
//     db.query(sql1, /**[name, id, kelas], */ (err, results) => {

//         //const ok = jawab.flat().join('');
//         if (err) {
//             console.error('select from database failed ', err);
//             return res.status(500).json({ text: 'select from database failed', stat: false });
//         }
//         if (results.length > 0) {

//             const ok = results.flat().join('');
//             res.json(ok)
//         } else {
//             res.json
//         }
//     })

// }
const calculate_nilai = (req, res) => {
    const name = req.session.user.name;
    const kelas = req.session.user.kelas;
    const id = req.params.id;

    const sql1 = `SELECT nilai FROM kalkulasi_nilai WHERE name = ? AND db_soal = ? AND kelas = ?`;
    db.query(sql1, [name, id, kelas], (err, results) => {
        if (err) {
            console.error('Select from database failed', err);
            return res.status(500).json({ text: 'Select from database failed', stat: false });
        }
        if (results.length > 0) {
            const nilai = results[0].nilai;
            //console.log(nilai);
            res.json(nilai);
        } else {
            const sql2 = `SELECT nilai FROM jawaban_siswa WHERE name = ? AND db_soal = ? AND kelas = ?`;
            db.query(sql2, [name, id, kelas], (err, results2) => {
                if (err) {
                    console.error('Select from database failed', err);
                    return res.status(500).json({ text: 'Select from database failed', stat: false });
                }
                if (results2.length > 0) {
                    //console.log("tes ",results2[0]);
                    // iko namnyo untuak maituang jumlah 1 dan 0
                    const counts = results2.reduce((acc, row) => {
                        acc[row.nilai] = (acc[row.nilai] || 0) + 1;
                        return acc;
                    }, {});
                    //console.log(results2);

                    const jumlahBenar = counts[1] || 0;
                    const jumlahSoal = results2.length;
                    //console.log(jumlahBenar, jumlahSoal);

                    const nilai1 = jumlahBenar / (jumlahSoal);
                    //const nilai1 = 8/8;
                    const nilai = nilai1 * 100;
                    const nilai2 = Math.round(nilai, 10);
                    //console.log(nilai1, nilai2, nilai)

                    const sql3 = `INSERT INTO kalkulasi_nilai (name, kelas, db_soal, nilai) VALUES (?,?,?,?)`;
                    db.query(sql3, [name, kelas, id, nilai2], (err, results3) => {
                        if (err) {
                            console.error('Select from database failed', err);
                            return res.status(500).json({ text: 'Select from database failed', stat: false });
                        }
                        res.status(200).json({
                            text: 'Jawaban berhasil dikirim!',
                            stat: true
                        });
                    });

                } else {
                   // console.log("data kosong cok")
                    res.json("data kosong")
                }

            });
        }
    });
};




module.exports = { jawabansiswa5, calculate_nilai }

/*db.query(sql2, (err, results2) => {
                        const query = `UPDATE jawaban_siswa SET jawaban = '${jawab}', nama_db = '${nama_kolom_db}' WHERE id_soal = '${idsoal}' AND name = '${nama}' AND db_soal = '${id}'`;

                        db.query(query, (err, result) => {
                            if (err) {
                                console.error('Insert into database failed 4', err);
                                return res.status(500).json({ text: 'Insert into database failed', stat: false });
                            }

                            res.status(200).json({
                                text: 'Jawaban berhasil dikirim!',
                                stat: true
                            });
                        });
                    }) */