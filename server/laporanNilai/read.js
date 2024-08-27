const db = require("../routes/dataBase")

const read_siswa_nilai = (req, res) => {
  const kelas = req.params.kelas;
  const nama = req.params.nama;
  const id = req.params.id;
  ////(nama, kelas, id)
  const sql = 'SELECT id, nilai FROM kalkulasi_nilai WHERE name = ? AND kelas = ? AND db_soal = ?';
  db.query(sql, [nama, kelas, id], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    } if (results.length > 0) {
      ////(results)
      res.json(results);
    } else {
      const sql2 = `SELECT nilai FROM jawaban_siswa WHERE name = ? AND db_soal = ? AND kelas = ?`;
      db.query(sql2, [nama, id, kelas], (err, results2) => {
        if (err) {
          console.error('Select from database failed', err);
          return res.status(500).json({ text: 'Select from database failed', stat: false });
        }
        if (results2.length > 0) {
          ////("tes ",results2[0]);
          // iko namnyo untuak maituang jumlah 1 dan 0
          const counts = results2.reduce((acc, row) => {
            acc[row.nilai] = (acc[row.nilai] || 0) + 1;
            return acc;
          }, {});
          ////(results2);

          const jumlahBenar = counts[1] || 0;
          const jumlahSoal = results2.length;
          ////(jumlahBenar, jumlahSoal);
          
          const nilai1 = jumlahBenar / (jumlahSoal);
           //const nilai1 = 8/8;
          const nilai = nilai1 * 100;
          const nilai2 = Math.round(nilai, 10);
          ////(nilai1, nilai2, nilai)

          const sql3 = `INSERT INTO kalkulasi_nilai (name, kelas, db_soal, nilai) VALUES (?,?,?,?)`;
          db.query(sql3, [nama, kelas, id, nilai2], (err, results3) => {
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
          //console.log("data kosong cok")
          res.json("data kosong")
        }

      });
    }

  });
};


const read_siswa_kelas = (req, res) => {
  const id = req.params.id;
  const sql2 = 'SELECT id, name FROM siswa WHERE kelas = ?';
  db.query(sql2, [id], (err, results2) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    res.json(results2);
  })
};

const read_siswa_sesi_cbt = (req, res) => {
  const kelas = req.params.kelas;
  const sql2 = 'SELECT id, name FROM sesi_cbt WHERE kelas = ?';
  db.query(sql2, [kelas], (err, results2) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    res.json(results2);
  })
};

const read_siswa_sesi_sekarang = (req, res) => {
  const id = req.params.id;
  const sql2 = 'SELECT name FROM sesi_cbt WHERE id = ?';
  db.query(sql2, [id], (err, results2) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    const nama = results2[0].name;
    ////(nama)
    res.json(nama);
  })
};


module.exports = { read_siswa_nilai, read_siswa_kelas, read_siswa_sesi_cbt, read_siswa_sesi_sekarang }