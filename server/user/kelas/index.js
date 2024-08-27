const db = require("../../routes/dataBase")

const TambahforumKelas = (req,res) =>{
    const isi = req.body.isi;
    const name = req.session.user.name;

    db.query(
        "INSERT INTO forumKelas (name, isi) VALUES (?, ?)",
        [name,isi],
        (err, result) => {
          if (err) {
            console.error("Insert into database failed", err);
            return res.status(500).json({ text: "Insert into database failed", stat: false });
          }
          console.log(result)
          res.status(200).json({
            text: "Success",
            stat: true,
            data: { isi: isi },
          });
        }
      );
}

const read_forumKelas = (req, res) => {
  
    const sql = `SELECT id, name, isi FROM forumKelas`;
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      console.log(results);
      res.json(results);
    });
  };


const delete_forumKelas = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM forumKelas WHERE id = ?`;
  
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
module.exports = {TambahforumKelas, read_forumKelas , delete_forumKelas}