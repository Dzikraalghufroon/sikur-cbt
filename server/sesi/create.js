const db = require("../routes/dataBase");

const Sesi = (req, res) => {
    try {
        const name = req.body.name;
        const banksoal = req.body.banksoal;
        const status = req.body.status;
        const durasi = req.body.durasi;
        const jadwal = req.body.jadwal;
        const jadwal_berakhir = req.body.jadwal_berakhir;
        const kelas = req.body.kelas;

        db.query(
            "SELECT * FROM sesi_cbt WHERE name=?",
            [name],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        `SELECT banksoal FROM ujian WHERE mapel = '${banksoal}'`,
                        (err, hasil) => {
                            if (err) {
                                console.error("Insert into database failed", err);
                                return res.status(500).json({ text: "Insert into database failed", stat: false });
                            }
                            if (hasil.length > 0) {
                                const data = hasil[0].banksoal;
                                console.log(data)
                                db.query(

                                    "INSERT INTO sesi_cbt (name,bank_soal, status, durasi,jadwal, jadwal_berakhir ,kelas ,db ) VALUES (? ,?, ?, ?, ?,?,?, ?)",
                                    [name, banksoal, status, durasi, jadwal, jadwal_berakhir, kelas, data],
                                    (err, resul) => {
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
                                )

                            }
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

    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}

const Sesi2 = (req, res) => {
    try {
        const name = req.body.name;
        const banksoal = req.body.banksoal;
        const status = req.body.status;
        const durasi = req.body.durasi;
        const jadwal = req.body.jadwal;
        const jadwal_berakhir = req.body.jadwal_berakhir;
        const kelas = req.body.kelas;

        db.query(
            "SELECT * FROM sesi_cbt WHERE name=?",
            [name],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        `SELECT banksoal FROM ujian WHERE mapel = '${banksoal}'`,
                        (err, hasil) => {
                            if (err) {
                                console.error("Insert into database failed", err);
                                return res.status(500).json({ text: "Insert into database failed", stat: false });
                            }
                            if (hasil.length > 0) {
                                const data = hasil[0].banksoal;
                                console.log(data)
                                "INSERT INTO sesi_cbt (name,bank_soal, status, durasi,jadwal, jadwal_berakhir ,kelas ,db ) VALUES (? ,?, ?, ?, ?,?,?, ?)",
                                    [name, banksoal, status, durasi, jadwal, jadwal_berakhir, kelas, data],
                                    (err, resul) => {
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
                            }
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

    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}

module.exports = Sesi, Sesi2;
