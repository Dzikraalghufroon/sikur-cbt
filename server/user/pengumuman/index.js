const { text } = require("body-parser");
const db = require("../../routes/dataBase")

const Tambahpengumuman = (req,res) =>{
    const isi = req.body.isi;

    db.query(
        "INSERT INTO pengumuman (isi) VALUES (?)",
        [isi],
        (err, result) => {
          if (err) {
            console.error("Insert into database failed", err);
            return res.status(500).json({ text: "Insert into database failed", stat: false });
          }
          //console.log(result)
          res.status(200).json({
            text: "Success",
            stat: true,
            data: { isi: isi },
          });
        }
      );
}

const read_pengumuman = (req, res) => {
  
    const sql = `SELECT id, isi, reg_date FROM pengumuman`;
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      //console.log(results);
      res.json(results);
    });
  };


const delete_pengumuman = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM pengumuman WHERE id = ?`;
  
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
module.exports = {Tambahpengumuman, read_pengumuman , delete_pengumuman}
