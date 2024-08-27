const db = require('../routes/dataBase');

const Update_mapel = (req, res) => {
  const { id, name } = req.body;
  const sql = `UPDATE mapel SET nama = '${name}'WHERE id = '${id}'`

  db.query(sql, (err, fields) => {
    //console.log(fields);
  })
  res.status(200).json({ text: 'Update success', stat: true });
}

const Update_kelas = (req, res) => {
  const { id, name } = req.body;
  const sql = `UPDATE kelas SET nama = '${name}'WHERE id = '${id}'`

  db.query(sql, (err, fields) => {
    //console.log(fields);
  })
  res.status(200).json({ text: 'Update success', stat: true });
}

const Update_siswa = (req, res) => {
  const { id, name, nisn, password, kelas, jenisKelamin } = req.body;
  const sql = `UPDATE siswa SET name = '${name}', nisn = '${nisn}', password = '${password}'
    ,kelas = '${kelas}', jenisKelamin = '${jenisKelamin}'
    WHERE id = '${id}'`

  db.query(sql, (err, fields) => {
    //console.log(fields);
  })
  res.status(200).json({ text: 'Update success', stat: true });
}

const Update_ujian = (req, res) => {
  const { id, name, mapel, kelas, deskripsi, acakSoal, acakJawaban, nilai, durasi } = req.body;
  const sql = `UPDATE ujian SET name = '${name}', mapel = '${mapel}', kelas = '${kelas}'
    ,deskripsi = '${deskripsi}', acakSoal = '${acakSoal}', acakJawaban = '${acakJawaban}', nilai = '${nilai}', durasi = '${durasi}'
    WHERE id = '${id}'`

  db.query(sql, (err, fields) => {
    //console.log(fields);
  })
  res.status(200).json({ text: 'Update success', stat: true });
}

const Update_bankSoal = (req, res) => {
  const { id, name, mapel } = req.body;
  const sql = `UPDATE bank_soal SET name = '${name}', mapel = '${mapel}'
    WHERE id = '${id}'`

  db.query(sql, (err, fields) => {
    //console.log(fields);
  })
  res.status(200).json({ text: 'Update success', stat: true });
}

// const Update_bankSoal2 = (req, res) => {
//   const { id, name, mapel } = req.body;
//   const sql = `UPDATE bank_soal SET name = '${name}', mapel = '${mapel}'
//   WHERE id = '${id}'`

//   db.query(sql, (err, fields) => {
//     console.log(fields);
//   })
//   res.status(200).json({ text: 'Update success', stat: true });
// }
const Update_bankSoal2 = (req, res) => {
  const { id, name, mapel } = req.body;

  const sql = `UPDATE bank_soal SET name = ?, mapel = ? WHERE id = ?`;

  db.query(sql, [name, mapel, id], (err, result) => {
    if (err) {
      console.error('Update failed', err);
      return res.status(500).json({ text: 'Update failed', stat: false });
    }

    console.log(result);
    res.status(200).json({ text: 'Update success', stat: true });
  });
};


  module.exports = { Update_mapel, Update_bankSoal, Update_kelas, Update_siswa, Update_ujian , Update_bankSoal2};