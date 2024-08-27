const db = require("../routes/dataBase");


const Banksoal = (req, res) => {
    try {
        const name = req.body.name;
        const mapel = req.body.mapel;

        db.query(
            "SELECT * FROM bank_soal WHERE name=?", 
            [name],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        "INSERT INTO bank_soal (name, mapel ) VALUES (?,?)", 
                        [name, mapel],
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
                    console.log("data already exist");
                    return res.status(200).json({
                        text: "Data already exists",
                        stat: false,
                    });
                }
            }
        );
        
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}

const read_banksoal = (req, res) => {
    const sql = 'SELECT id, name, mapel FROM bank_soal';
    //console.log("membaca tabel");
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      //console.log("Query successful, sending results");
      res.json(results);
    });
  };

module.exports = {Banksoal, read_banksoal}
