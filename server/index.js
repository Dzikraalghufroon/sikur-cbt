const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const signIn = require("./test");


// Middleware 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'your_secret_key', // Ganti dengan kunci rahasia yang lebih kuat
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ubah menjadi true jika menggunakan HTTPS
}));

app.post('/login', signIn);

app.get("/dashboard", signIn, (req, res) => {
  res.status(200).json({ text: "Welcome to your dashboard", stat: true, data: { name: req.session.validasi.name } });
});
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});
