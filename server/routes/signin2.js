const db = require("./dataBase");
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { text } = require("body-parser");

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
                    //console.log(req.session.user.name)
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
const Update_admin = (req, res) => {
    const { username, password } = req.body;
    const sql = `UPDATE Admin SET name = ?, sandi = ? WHERE id = 1`;

    db.query(sql, [username, password], (err, fields) => {
        if (err) {
            // Menangani error yang terjadi saat query
            console.error(err);
            return res.status(500).json({ text: 'Gagal mengupdate data', error: err });
        }
        // Jika query berhasil
        res.status(200).json({ text: 'Update success', stat: true });
    });
};

module.exports = {signInAdmin,Update_admin};
