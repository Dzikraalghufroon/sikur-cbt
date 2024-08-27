const db = require("../../routes/dataBase");

const read_data_siswa = (req, res) => {
  const nama = req.session.user.name;
  //console.log(nama);

  const sql = `SELECT kelas FROM siswa WHERE name = '${nama}'`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }

    if (results.length > 0) {
      const kelas = results[0].kelas;
      const status = 1;
      req.session.user.kelas = kelas;

      const sql = `SELECT nisn, jenisKelamin FROM siswa WHERE name = '${nama}'`;
      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Database query failed' });
          return;
        }
        res.json(result)

      });
    } else {
      res.status(404).json({ error: 'Class not found for the user' });
    }
  });
};
const status_ujian = (req, res) => {
  try {
    const name = req.session.user.name;
    const id = req.params.id;
    const status = 1;

    const sql = `SELECT kelas FROM siswa WHERE name = '${name}'`;

    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      if (results.length > 0) {

        const kelas = results[0].kelas;

        db.query(
          "SELECT name FROM status_ujian_siswa WHERE db_soal=?",
          [name],
          (err, result) => {
            if (err) {
              console.error("Database query failed", err);
              return res.status(500).json({ text: "Database query failed", stat: false });
            }

            if (result.length === 0) {
              db.query(
                "INSERT INTO status_ujian_siswa (name, db_soal, status, kelas) VALUES (?,?,?,?)",
                [name, id, status, kelas],
                (err, result) => {
                  if (err) {
                    console.error("Insert into database failed", err);
                    return res.status(500).json({ text: "Insert into database failed", stat: false });
                  }

                  res.status(200).json({
                    text: "Success",
                    stat: true,
                    data: { name: name },
                  });
                }
              );
            } else {
              return res.status(200).json({
                text: "Data already exists",
                stat: false,
              });
            }
          }
        );

      }

    }
    )


  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ text: "Error during sign up", stat: false });
  }
}
const read_status_ujian_siswa = (req, res) => {
  const nama = req.session.user.name;
  const { id } = req.params;
  //console.log(nama, id)

  const sql = `SELECT * FROM status_ujian_siswa WHERE name = ? AND db_soal = ?`;
  db.query(sql, [nama, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    //console.log(result)
    if (result.length > 0) {
      res.json(1);
    } else {
      res.json(0);
    }
  })


}

module.exports = { read_data_siswa, status_ujian, read_status_ujian_siswa }