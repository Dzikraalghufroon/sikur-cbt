const { text } = require("body-parser");
const db = require("../../routes/dataBase");

// const read_kelas_user = (req, res) => {
//   const nama = req.session.user.name;
//   //console.log(nama);

//   const sql = `SELECT kelas FROM siswa WHERE name = '${nama}'`;
//   db.query(sql, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'Database query failed' });
//       return;
//     }

//     if (results.length > 0) {
//       const kelas = results[0].kelas;
//       const status = 1;
//       //console.log(kelas);

//       const sql = `SELECT id,name,bank_soal, durasi, jadwal, jadwal_berakhir, kelas FROM sesi_cbt WHERE kelas = '${kelas}' AND status = '${status}'`;
//       db.query(sql, (err, result) => {
//         if (err) {
//           res.status(500).json({ error: 'Database query failed' });
//           return;
//         }
//         //console.log(result);
//         res.json(result);
//       });
//     } else {
//       res.status(404).json({ error: 'Class not found for the user' });
//     }
//   });
// };
const read_kelas_user = (req, res) => {
  const nama = req.session.user.name;

  const sql = `SELECT kelas FROM siswa WHERE name = ?`;
  db.query(sql, [nama], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }

    if (results.length > 0) {
      const kelas = results[0].kelas;
      const status = 1;

      const sql = `SELECT id, name, bank_soal, durasi, jadwal, jadwal_berakhir, kelas FROM sesi_cbt WHERE kelas = ? AND status = ?`;
      db.query(sql, [kelas, status], (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Database query failed' });
          return;
        }

        if (result.length > 0) {
          let validSesi = [null];

          for (let index = 0; index < result.length; index++) {
            const jadwal = new Date(result[index].jadwal);
            const berakhir = new Date(result[index].jadwal_berakhir);

            // Set waktu ke tengah malam untuk kedua tanggal
            jadwal.setHours(0, 0, 0, 0);
            berakhir.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set waktu ke tengah malam untuk hari ini

            if (jadwal <= today && today <= berakhir) {
              validSesi[index] = result[index];
              //console.log(today)
              //console.log(berakhir)
              //console.log(jadwal)
              //console.log(validSesi)
            }
          }


          if (validSesi) {
            //console.log(validSesi)
            res.json(validSesi);
          } else {
            res.json({ text: "Belum ada jadwal yang dimulai" });
          }

        } else {
          res.json({ text: "Tidak ada sesi CBT yang sesuai untuk kelas ini" });
        }
      });
    } else {
      res.status(404).json({ error: 'Class not found for the user' });
    }
  });
};

const read_ujian_user = (req, res) => {
  const nama = req.session.user.name;
  const { id } = req.params;

  const conn = `SELECT * FROM status_ujian_siswa WHERE name = ? AND db_soal = ?`;

  db.query(conn, [nama, id], (err, hasil) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }

    if (hasil.length > 0) {
      res.json({ text: "kamu sudah menjawab" });
      //console.log(hasil);
    } else {
      const sql = `SELECT bank_soal, kelas FROM sesi_cbt WHERE id = ?`;

      db.query(sql, [id], (err, results) => {
        if (err) {
          res.status(500).json({ error: 'Database query failed' });
          return;
        }

        if (results.length > 0) {
          const bank_soal = results[0].bank_soal;
          const lokal = results[0].kelas;
          //const durasi = results[0].durasi;
          const kelassekarang = req.session.user.kelas;

          if (lokal !== kelassekarang) {
            res.json({ text: "ang salah kelas anjiang" });
          } else {
            const sql = `SELECT banksoal FROM ujian WHERE mapel = ?`;

            db.query(sql, [bank_soal], (err, result) => {
              if (err) {
                res.status(500).json({ error: 'Database query failed 2' });
                return;
              }

              if (result.length > 0) {
                const banksoal = result[0].banksoal;
                //console.log("bismillah jadi bukan undefined" + banksoal);

                const sql = `SELECT id, filesoal, soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, file_a, file_b, file_c, file_d, file_e 
                             FROM db_soal WHERE banksoal = ?`;

                db.query(sql, [banksoal], (err, resul) => {
                  if (err) {
                    res.status(500).json({ error: 'Database query failed 3' });
                    return;
                  }

                  //console.log(resul);
                  res.json(resul); //durasi
                });
              } else {
                res.status(404).json({ error: 'Class not found for the user' });
              }
            });
          }
        } else {
          res.status(404).json({ error: 'Class not found for the user' });
        }
      });
    }
  });
};

const read_durasi_ujian = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT durasi FROM sesi_cbt WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    const waktu = results[0].durasi;
    res.json(waktu);
  })

}
// const read_durasi_ujian = (req, res) => {
//   const { id } = req.params;

//   const sql = `SELECT durasi FROM sesi_cbt WHERE id = ?`;

//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'Database query failed' });
//       return;
//     }

//     if (results.length > 0) {
//       let waktu = results[0].durasi;
//       let durasiDetik = waktu * 60; // waktu di yang berupa menit di kali jo 60 supayo bisa jadi detik
//       //req.session.user = req.session.user || {}; 
//       req.session.user.durasi = durasiDetik; // Simpan durasi dalam detik ke session
//       console.log(durasiDetik)
//       res.status(200).json({ durasi: durasiDetik }); // Mengirimkan durasi dalam detik
//     } else {
//       res.status(404).json({ error: 'Data tidak ditemukan' });
//     }
//   });
// };



const read_jawaban_pilihan_user = (req, res) => {
  const nama = req.session.user.name;
  const id = req.params.id;
  const dbsoal = req.params.dbsoal;

  const sql = `SELECT jawaban FROM jawaban_siswa WHERE name = ? AND id_soal = ? AND db_soal = ?`;
  db.query(sql, [nama, id, dbsoal], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    console.log(results);
    res.json(results);
  });
};

const read_nomor_terisi_user2 = (req, res) => {
  const nama = req.session.user.name;
  const id = req.params.id;

  const sql = `SELECT id_soal FROM jawaban_siswa WHERE name = ? AND db_soal = ?`;
  db.query(sql, [nama, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    if (results.length === 0) {
      //console.log("ucok")
      res.json(17)
    } else {

      //console.log(results);
      res.json(results);
    }
  });
};
const read_nomor_terisi_user = (req, res) => {
  const nama = req.session.user.name;
  const id = req.params.id;

  const sql = `SELECT id_soal FROM jawaban_siswa WHERE name = ? AND db_soal = ?`;
  db.query(sql, [nama, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    if (results.length === 0) {
      //console.log("iajijj")

      const conn = `SELECT id_soal FROM tes_nomor`;
      db.query(conn, (err, hasil) => {
        if (err) {
          res.status(500).json({ error: 'Database query failed' });
          return;
        }
        //console.log(hasil)
        res.json(hasil);
      })
      // res.json([{
      //   "id_soal": 12
      // }])
    } else {

      res.json(results);
    }
  });
};





module.exports = { read_ujian_user, read_kelas_user, read_jawaban_pilihan_user, read_nomor_terisi_user, read_durasi_ujian }
/*if (results.length > 0) {
      const bank_soal = results[0].bank_soal;
      const status = 1;
      //console.log(bank_soal)

      const sql = `SELECT id, soal , opsi_a, opsi_b, opsi_c, opsi_d, opsi_e FROM db_soal WHERE banksoal = '${bank_soal}'`;//banksoal = '${bank_soal}'`;//1`;//
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Database query failed 2' });
          return;
        }
        console.log(result);
        res.json(result); 
      });
    } else {
      res.status(404).json({ error: 'Class not found for the user' });
    } */