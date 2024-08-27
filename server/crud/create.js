const db = require("../routes/dataBase");

const Mapel = (req, res) => {
    try {
        const name = req.body.name;

        db.query(
            "SELECT * FROM mapel WHERE nama=?", 
            [name],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        "INSERT INTO mapel (nama) VALUES (?)", 
                        [name],
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
        
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}

const Kelas = (req, res) => {
    try {
        const name = req.body.name;

        db.query(
            "SELECT * FROM kelas WHERE nama=?", 
            [name],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        "INSERT INTO kelas (nama) VALUES (?)", 
                        [name],
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
        
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}

const Siswa = (req, res) => {
    try {
        const { name, nisn, password, kelas, jenisKelamin } = req.body;


        if (!name || !nisn || !password || !kelas || !jenisKelamin) {
            return res.status(400).json({ text: "ok", stat: false });
        }

        db.query(
            "SELECT * FROM siswa WHERE name=?", 
            [name],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        "INSERT INTO siswa (name, nisn, kelas, jenisKelamin, password) VALUES (?,?,?,?,?)", 
                        [name, nisn, kelas, jenisKelamin, password],
                        (err, result) => {
                            if (err) {
                                console.error("Insert into database failed", err);
                                return res.status(500).json({ text: "Insert into database failed", stat: false });
                            }

                            res.status(200).json({
                                text: "Success",
                                stat: true,
                                data: { name },
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
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}

const Ujian = (req, res) => {
    try {
        const {mapel,banksoal, kelas, deskripsi,  durasi } = req.body;//acakSoal, acakJawaban, nilai,

        if (!banksoal || !mapel || !kelas || !deskripsi ||  !durasi) {//acakSoal === undefined || acakJawaban === undefined || nilai === undefined ||
            return res.status(400).json({ text: "All fields are required", stat: false });
        }

        //console.log("Data received:", { mapel,banksoal, kelas, deskripsi, acakSoal, acakJawaban, nilai, durasi });

        db.query(
            "SELECT * FROM ujian WHERE mapel = ?", 
            [mapel],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        "INSERT INTO ujian (mapel,banksoal, kelas, deskripsi,  durasi) VALUES (?, ?, ?, ?, ?)",// acakSoal, acakJawaban, nilai,acakSoal, acakJawaban, nilai,, ?, ?, ?
                        
                        [ mapel, banksoal, kelas, deskripsi,  durasi],
                        (err, result) => {
                            if (err) {
                                console.error("Insert into database failed", err);
                                return res.status(500).json({ text: "Insert into database failed", stat: false });
                            }

                            res.status(200).json({
                                text: "Success",
                                stat: true,
                                data: { mapel },
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
    } catch (error) {
        console.error("Error during operation:", error);
        res.status(500).json({ text: "Internal server error", stat: false });
    }
}

const Create = (req, res) => {
    try {
        const name = req.body.name;

        db.query(
            "SELECT * FROM kelas WHERE nama=?", 
            [name],
            (err, result) => {
                if (err) {
                    console.error("Database query failed", err);
                    return res.status(500).json({ text: "Database query failed", stat: false });
                }

                if (result.length === 0) {
                    db.query(
                        "INSERT INTO kelas (nama) VALUES (?)", 
                        [name],
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
        
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ text: "Error during sign up", stat: false });
    }
}


module.exports = {Mapel, Kelas, Siswa, Ujian, Create};
