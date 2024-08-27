const db = require("../routes/dataBase")

const modul_update_soal = (req, res) => {
  const { name: id, soal } = req.body;
  const sql = `UPDATE db_soal SET soal = ? WHERE id = ?`;

  db.query(sql, [soal, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ text: 'Update failed', stat: false, error: err.message });
    }
    console.log('Fields affected:', result.affectedRows);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};


const modul_update_opsi_a = (req, res) => {
  const { name: id, opsi_a } = req.body;
  const sql = `UPDATE db_soal SET opsi_a = ? WHERE id = ?`;

  db.query(sql, [opsi_a, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ text: 'Update failed', stat: false, error: err.message });
    }
    console.log('Fields affected:', result.affectedRows);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};

const modul_update_opsi_b = (req, res) => {
  const { name: id, opsi_b } = req.body;
  const sql = `UPDATE db_soal SET opsi_b = ? WHERE id = ?`;

  db.query(sql, [opsi_b, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ text: 'Update failed', stat: false, error: err.message });
    }
    console.log('Fields affected:', result.affectedRows);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};

const modul_update_opsi_c = (req, res) => {
  const { name: id, opsi_c } = req.body;
  const sql = `UPDATE db_soal SET opsi_c = ? WHERE id = ?`;

  db.query(sql, [opsi_c, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ text: 'Update failed', stat: false, error: err.message });
    }
    console.log('Fields affected:', result.affectedRows);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};

const modul_update_opsi_d = (req, res) => {
  const { name: id, opsi_d } = req.body;
  const sql = `UPDATE db_soal SET opsi_d = ? WHERE id = ?`;

  db.query(sql, [opsi_d, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ text: 'Update failed', stat: false, error: err.message });
    }
    console.log('Fields affected:', result.affectedRows);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};

const modul_update_opsi_e = (req, res) => {
  const { name: id, opsi_e } = req.body;
  const sql = `UPDATE db_soal SET opsi_e = ? WHERE id = ?`;

  db.query(sql, [opsi_e, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ text: 'Update failed', stat: false, error: err.message });
    }
    console.log('Fields affected:', result.affectedRows);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};

const modul_update_jawaban = (req, res) => {
  const { name: id, jawaban } = req.body;
  const sql = `UPDATE db_soal SET jawaban = ? WHERE id = ?`;

  db.query(sql, [jawaban, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ text: 'Update failed', stat: false, error: err.message });
    }
    console.log('Fields affected:', result.affectedRows);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};

const modul_edit_soal = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, banksoal, filesoal, soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, file_a, file_b, file_c, file_d, file_e, jawaban FROM db_soal WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching soal data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);

    }
  });
};

module.exports = { modul_update_jawaban, modul_update_opsi_a, modul_update_opsi_b, modul_update_opsi_c, modul_update_opsi_d, modul_update_opsi_e, modul_update_soal , modul_edit_soal}

