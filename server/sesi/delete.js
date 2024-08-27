const db = require("../routes/dataBase")

const delete_sesi = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM sesi_cbt WHERE id = ?`;

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

module.exports = delete_sesi