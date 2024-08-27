const db = require("../routes/dataBase")

const delete_mapel = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM mapel WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ text: 'Error deleting data', stat: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ text: 'Data not found', stat: false });
    }

    res.status(200).json({ text: 'Hapus success', stat: true });
  });

}
const delete_kelas = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM kelas WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ text: 'Error deleting data', stat: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ text: 'Data not found', stat: false });
    }

    res.status(200).json({ text: 'Hapus success', stat: true });
  });
}

const delete_siswa = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM siswa WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ text: 'Error deleting data', stat: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ text: 'Data not found', stat: false });
    }

    res.status(200).json({ text: 'Hapus success', stat: true });
  });
}

const delete_ujian = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM ujian WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ text: 'Error deleting data', stat: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ text: 'Data not found', stat: false });
    }

    res.status(200).json({ text: 'Hapus success', stat: true });
  });
}

const delete_banksoal = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM bank_soal WHERE name = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ text: 'Error deleting data', stat: false });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ text: 'Data not found', stat: false });
    }
    const sql2 = `DELETE FROM db_soal WHERE banksoal = ?`;
    db.query(sql2, [id], (err, result) => {
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
}

module.exports = { delete_banksoal, delete_kelas, delete_mapel, delete_siswa, delete_ujian }
