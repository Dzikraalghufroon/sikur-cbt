const db = require("../../routes/dataBase")

const mulai_waktu_ujian = (req, res) => {
    const id = req.params.id;
    const name = req.session.user.name;
    const kelas = req.session.user.kelas;
    const sql = `SELECT durasi FROM waktu_ujian WHERE name = ? AND kelas = ?  AND id_soal = ?`;//AND kelas = ? kelas,
    db.query(sql, [name, kelas, id], (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Failed to start exam' });
      }
      if (results.length > 0) {
        //console.log(results)
        
        const resultDurasi = results[0].durasi;
  
        res.json(resultDurasi)
      } else {
        const sql2 = `SELECT durasi FROM sesi_cbt WHERE id = ?`;
        //console.log("masuk pak eko")
  
        db.query(sql2, [id], (err, results2) => {
          if (err) {
            res.status(500).json({ error: 'Database query failed' });
            return;
          }
          const waktu = results2[0].durasi;
          const waktuMulai = new Date();
          //console.log(waktu)
          const sql3 = `INSERT INTO waktu_ujian (name,  id_soal, durasi,kelas, waktu_mulai) VALUES (?,?,?,?,?)`;
          db.query(sql3, [name, id, waktu,kelas, waktuMulai], (err, results3) => {
            if (err) {
              console.log(err)
              return res.status(500).json({ error: 'Failed to insert' });
            }
            res.json(waktu)
          })
        })
  
      }
    })
  };

const refresh_waktu_ujian =  (req, res) => {
    const id = req.body.id;
    const waktuMulai = new Date(); // Timestamp saat ujian dimulai
    const name = req.session.user.name;
    const kelas = req.session.user.kelas;
  
    const sql = `UPDATE waktu_ujian SET waktu_sekarang = ? WHERE name = ? AND kelas = ?  AND id_soal = ?`;//AND kelas = ? kelas,kelas,  kelas,  kelas,kelas,kelas,
    db.query(sql, [waktuMulai, name,kelas, id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to start exam' });
      }
      res.status(200).json({ message: 'Exam started' });
    });
  };
  
const get_waktu_ujian = (req, res) => {
    const { id } = req.params;
    const name = req.session.user.name;
    const kelas = req.session.user.kelas;
  
    const sql = `SELECT durasi, waktu_mulai FROM waktu_ujian WHERE name = ? AND kelas = ? AND id_soal = ?`;
    db.query(sql, [name, kelas, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query failed okok' });
      }
  
      if (results.length === 0) {
        console.log("kosong cok")
        return res.status(404).json({ error: 'kosong cok' });
      }
  
      const { durasi, waktu_mulai } = results[0];
      const durasiDetik = durasi * 60;
      const waktuMulai = new Date(waktu_mulai);
      const waktuSekarang = new Date();
      const waktuTersisa = Math.max(0, durasiDetik - Math.floor((waktuSekarang - waktuMulai) / 1000));
  
      res.json( waktuTersisa );
    });
  };

module.exports = {mulai_waktu_ujian,refresh_waktu_ujian,get_waktu_ujian}
  