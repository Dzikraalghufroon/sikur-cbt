const db = require("../routes/dataBase");

const read_sesi = (req, res) => {
    const sql = 'SELECT id, name,bank_soal, status, durasi, kelas , jadwal, jadwal_berakhir FROM sesi_cbt';
 
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json(results);
    });
  };

module.exports = read_sesi ;