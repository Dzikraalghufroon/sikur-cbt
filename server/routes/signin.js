const db = require("./dataBase");
const jwt = require('jsonwebtoken');

const signInUser = (req, res) => {
    try {
        const { name, pass } = req.body;

        db.query(
            "SELECT * FROM siswa WHERE name=? AND password=?", 
            [name, pass],
            (err, result) => {
                if (err) throw err;

                if (result.length > 0) {
                    req.session.user = { name: name, pass: pass };
                    const token = jwt.sign({ userId: result[0].id }, process.env.JWT_USER_SECRET_KEY, { expiresIn: '1h' });
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

const signInAdmin = (req, res) => {
    try {
        const { name, pass } = req.body;

        db.query(
            "SELECT * FROM Admin WHERE name=? AND sandi=?", 
            [name, pass],
            (err, result) => {
                if (err) throw err;

                if (result.length > 0) {
                    req.session.user = { name: name, pass: pass };
                    const token = jwt.sign({ adminId: result[0].id }, process.env.JWT_ADMIN_SECRET_KEY, { expiresIn: '1h' });
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

module.exports = { signInUser, signInAdmin };
