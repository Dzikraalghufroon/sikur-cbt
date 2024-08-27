const db = require("../routes/dataBase")

const delete_Status_ujian = (req, res) => {
  const kelas = req.params.kelas;
  const nama = req.params.nama;
  const id = req.params.id;
  const sql = `DELETE FROM kalkulasi_nilai WHERE name = ? AND kelas = ? AND db_soal = ?`;

  db.query(sql, [nama, kelas, id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ text: 'Error deleting data', stat: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ text: 'Data not found', stat: false });
    }
    const sql2 = `DELETE FROM status_ujian_siswa WHERE name = ? AND kelas = ? AND db_soal = ?`;
    db.query(sql2, [nama, kelas, id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ text: 'Error deleting data', stat: false });
      }


      if (result.affectedRows === 0) {
        return res.status(404).json({ text: 'Data not found', stat: false });
      }

      // res.status(200).json({ text: 'Hapus success', stat: true });
      const sql3 = `DELETE FROM waktu_ujian WHERE name = ? AND kelas = ? AND id_soal = ?`;
    db.query(sql3, [nama, kelas, id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ text: 'Error deleting data', stat: false });
      }


      if (result.affectedRows === 0) {
        return res.status(404).json({ text: 'Data not found', stat: false });
      }

      res.status(200).json({ text: 'Hapus success', stat: true });

    });

    });
  });
}
const read_siswa_nilai2 = (req, res) => {
  const kelas = req.params.kelas;
  const nama = req.params.nama;
  const id = req.params.id;
  //console.log(nama, kelas, id)
  const sql = 'SELECT id, nilai FROM kalkulasi_nilai WHERE name = ? AND kelas = ? AND db_soal = ?';
  db.query(sql, [nama, kelas, id], (err, results) => {
    if (err) {
      console.error("error cok")
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json({ text: "data kosong cok" })
    }
  })
}
module.exports = { delete_Status_ujian,read_siswa_nilai2 }