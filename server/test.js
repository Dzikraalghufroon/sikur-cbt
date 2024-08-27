const db = require("./routes/dataBase");

const signIn = (req, res) => {
    try {
        const name = req.body.name;
        const pass = req.body.pass;

        // Gunakan query SQL dengan placeholder
        db.query(
            "SELECT * FROM Items WHERE name=? AND sandi=?", 
            [name, pass],
            (err, result) => {
                if (err) throw err;

                if (result.length > 0) {
                    req.session.validasi = { name: name, pass: pass };
                    return res.status(200).json({ text: "ada bung", stat: true, data: { name: name } });
                }

                res.status(401).json({ text: "account not found", stat: false, data: null });
            }
        );
    } catch (error) {
        console.log("gagal");
        console.error("Error during sign In:", error);
        res.status(500).json({ text: "error on signin route", stat: false, data: null });
    }
}

module.exports = signIn;
