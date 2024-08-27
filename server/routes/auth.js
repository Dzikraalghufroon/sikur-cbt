const jwt = require('jsonwebtoken');

// Middleware untuk autentikasi siswa
const authUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_USER_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

// Middleware untuk autentikasi admin
const authAdmin = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ text: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ text: "Failed to authenticate token" });
        }

        // Simpan informasi pengguna yang sudah diverifikasi
        req.adminId = decoded.adminId;
        next();
    });
};


module.exports = { authUser, authAdmin,verifyToken };
