const db = require("../routes/dataBase");
const jwt = require('jsonwebtoken');

const signIn = (req, res) => {
    try {
        console.log("ok");
        const name = req.body.name;
        const pass = req.body.pass;

        // Gunakan query SQL dengan placeholder
        db.query(
            "SELECT * FROM siswa WHERE name=? AND password=?", 
            [name, pass],
            (err, result) => {
                if (err) throw err;

                if (result.length > 0) {
                    console.log("sukses");
                    const jwtSecretKey = process.env.JWT_SECRET_KEY2;
                    const token = jwt.sign({ userId: result[0].id }, jwtSecretKey, { expiresIn: '1h' });

                    return res.status(200).json({ text: "Login successful", stat: true, data: { token } });
                }

                res.status(401).json({ text: "Account not found", stat: false, data: null });
            }
        );
    } catch (error) {
        console.error("Error during sign In:", error);
        res.status(500).json({ text: "Error on sign-in route", stat: false, data: null });
    }
}

module.exports = signIn;
