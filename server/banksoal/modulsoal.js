const db = require("../routes/dataBase");


const modul_input_soal = (req, res) => {
    try {
        const name = req.body.name;
        const soal = req.body.soal;
        const opsi_a = req.body.opsi_a;
        const opsi_b = req.body.opsi_b;
        const opsi_c = req.body.opsi_c;
        const opsi_d = req.body.opsi_d;
        const opsi_e = req.body.opsi_e;
        const jawaban = req.body.jawaban;

        db.query(
            "INSERT INTO db_soal (banksoal,soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban) VALUES (?,?,?,?,?,?,?,?)", 
            [name, soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e,jawaban],
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
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}

const modul_read_soal = (req, res) => {
    const { id } = req.params;
    const query = `SELECT id, banksoal, filesoal, soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, file_a, file_b, file_c, file_d, file_e, jawaban FROM db_soal WHERE banksoal = ?`;
  
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching soal data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
  }

const modul_hapus_soal = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM db_soal WHERE id = ?`;

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

module.exports = {modul_input_soal, modul_hapus_soal, modul_read_soal}

  
