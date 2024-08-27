const db = require("../routes/dataBase");

const read_mapel = (req, res) => {
    const sql = 'SELECT id, nama FROM mapel';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      
      res.json(results);
    });
  };
  
  //Untuk membaca tabel kelas
const read_kelas = (req, res) => {
    const sql = 'SELECT id, nama FROM kelas';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      
      res.json(results);
    });
  };
  
  //Untuk membaca tabel Siswa
const read_siswa = (req, res) => {
    const sql = 'SELECT id, name, nisn, kelas, jenisKelamin, password FROM siswa';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      
      res.json(results);
    });
  };
  
  //endpoint untuk baca ujian
  
const read_ujian = (req, res) => {
    const sql = 'SELECT id, mapel,banksoal,  kelas, deskripsi, acakSoal, acakJawaban, nilai, durasi FROM ujian';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      
      res.json(results);
    });
  };
  
  // Endpoint untuk membaca soal
const read_soal = (req, res) => {
    const sql = 'SELECT id, name, jumlah FROM users';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json(results);
    });
  };
  const read_ujian_for_sesi = (req, res) => {
    const sql = 'SELECT mapel FROM ujian';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      
      res.json(results);
    });
  };

  const read_mapel_for_sesi = (req, res) => {
    const sql = 'SELECT mapel FROM ujian';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      
      res.json(results);
    });
  };
module.exports = {read_kelas, read_mapel, read_siswa, read_soal, read_ujian, read_ujian_for_sesi, read_mapel_for_sesi} ;