const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require("path");
const mysqlStore = require("express-mysql-session")(session); // Gunakan session dari express-session
const app = express();

dotenv.config();

const corsOptions = {
  // origin: 'http://10.10.27.239:5173', // Ganti dengan origin yang tepat
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // optionsSuccessStatus: 200, // Sesuaikan dengan metode HTTP yang diperlukan
  // credentials: true 
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};

const store = new mysqlStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  createDatabaseTable: true,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 43200000, // 12 jam
    //secure: process.env.NODE_ENV === 'production' 
  }
});

// Middleware setup
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);

const {signInAdmin,Update_admin} = require('./routes/signin2');
const { signInUser } = require('./routes/signin');
const { authUser, authAdmin, verifyToken } = require('./routes/auth');

app.post('/signin/user', signInUser);
app.post('/signin/admin', signInAdmin);

app.put('/update/admin' ,(req,res)=>{Update_admin(req,res)})


app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Unable to log out');
    }
    console.log("sukses cok")
    res.clearCookie('dbect.sid');
    return res.status(200).send('Logout successful');

  });
});



app.get('/set', (req, res) => {
  req.session.firstName = 'ucok';
  //console.log('req.session: ' + req.session.firstName);
});

app.get('/get', (req, res) => {
  if (req.session.user) {
    // return console.log(req.session.user)
    return res.status(200).json({
      text: "Profile fetched",
      stat: true,
      data: { name: req.session.user.name }
    });
  } else {
    return res.status(404).json({
      text: "No user found in session",
      stat: false,
      data: null
    });
  }
});



// Rute yang dilindungi
app.get('/profile', (req, res) => {
  //console.log(req.session.user)
  if (!req.session.user) {
    res.send(`Welcome ${req.session.user.name}`);
  } else {
    res.send('Please log in');
  }
});

app.get('/dashboardtes', (req, res) => {
  if (req.session.user) {
    res.send('This is your dashboard');
  } else {
    res.status(403).send('Access denied');
  }
});


app.get('/dashboard', authUser, (req, res) => {
  res.status(200).send('Welcome to the user dashboard');
});

app.get('/admin-dashboard', authAdmin, (req, res) => {
  res.status(200).send('Welcome to the admin dashboard');
  console.log(req.session.user.name)
});

//let PORT = process.env.PORT || 5000;
// const ip = '10.10.27.239'; 
// const port = 5000;
const ip = process.env.IP;
const port = process.env.PORT;
app.listen(port, ip, () => {
  console.log(`Server is up and running on ${ip}:${port} ...`);//${PORT}
});

const { read_kelas, read_mapel, read_siswa, read_soal, read_ujian, read_ujian_for_sesi, read_mapel_for_sesi } = require("./crud/read");

const { read_banksoal, Banksoal } = require('./banksoal/banksoal')

app.get("/usersesi", signInAdmin, (req, res) => {
  res.status(200).json({ text: "Welcome to your profil", stat: true, data: { name: req.session.user } });
});


app.get("/read_banksoal", (req, res) => { read_banksoal(req, res) });

app.get("/read_kelas", (req, res) => { read_kelas(req, res) });

app.get("/read_mapel", (req, res) => { read_mapel(req, res) });

app.get("/read_siswa", (req, res) => { read_siswa(req, res) });

app.get("/read_soal", (req, res) => { read_soal(req, res) });

app.get("/read_ujian", (req, res) => { read_ujian(req, res) });

app.get("/read_ujian_sesi", (req, res) => { read_ujian_for_sesi(req, res) });

app.get("/read_mapel_sesi", (req, res) => { read_mapel_for_sesi(req, res) });

const { Update_mapel, Update_bankSoal, Update_kelas, Update_siswa, Update_ujian, Update_bankSoal2 } = require("./crud/update")


app.put("/update_kelas", (req, res) => { Update_kelas(req, res) });

app.put("/update_mapel", (req, res) => { Update_mapel(req, res) });

app.put("/update_siswa", (req, res) => { Update_siswa(req, res) });

app.put("/update_banksoal", (req, res) => { Update_bankSoal(req, res) });

app.put("/update_ujian", (req, res) => { Update_ujian(req, res) });

app.put("/update_banksoal2", (req, res) => { Update_bankSoal2(req, res) });

const { delete_banksoal, delete_kelas, delete_mapel, delete_siswa, delete_ujian } = require("./crud/delete")

app.delete("/delete_banksoal/:id", (req, res) => { delete_banksoal(req, res) })

app.delete("/delete_kelas/:id", (req, res) => { delete_kelas(req, res) })

app.delete("/delete_mapel/:id", (req, res) => { delete_mapel(req, res) })

app.delete("/delete_siswa/:id", (req, res) => { delete_siswa(req, res) })

app.delete("/delete_ujian/:id", (req, res) => { delete_ujian(req, res) })


const { Mapel, Kelas, Siswa, Ujian, Create } = require("./crud/create");

app.post("/tambah_mapel", (req, res) => { Mapel(req, res) })

app.post("/tambah_kelas", (req, res) => { Create(req, res) })

app.post("/tambah_siswa", (req, res) => { Siswa(req, res) })

app.post("/tambah_ujian", (req, res) => { Ujian(req, res) })

app.post("/tambah_banksoal", (req, res) => { Banksoal(req, res) })

////////////////////Bank soal

const { modul_hapus_soal, modul_read_soal, modul_input_soal } = require("./banksoal/modulsoal")

app.get("/modul-read-soal/:id", (req, res) => { modul_read_soal(req, res) })

app.delete("/modul-delete-soal/:id", (req, res) => { modul_hapus_soal(req, res); })

app.post("/modul-input-soal", (req, res) => { modul_input_soal(req, res) });


/////////////////////////////////////////

const { modul_update_jawaban, modul_update_opsi_a, modul_update_opsi_b, modul_update_opsi_c, modul_update_opsi_d, modul_update_opsi_e, modul_update_soal, modul_edit_soal } = require("./banksoal/update")
app.put("/modul-update-soal", (req, res) => { modul_update_soal(req, res) });

app.put("/modul-update-opsi_a", (req, res) => { modul_update_opsi_a(req, res) });

app.put("/modul-update-opsi_b", (req, res) => { modul_update_opsi_b(req, res) });

app.put("/modul-update-opsi_c", (req, res) => { modul_update_opsi_c(req, res) });

app.put("/modul-update-opsi_d", (req, res) => { modul_update_opsi_d(req, res) });

app.put("/modul-update-opsi_e", (req, res) => { modul_update_opsi_e(req, res) });

app.put("/modul-update-jawaban", (req, res) => { modul_update_jawaban(req, res) });

app.get('/modul-edit-soal/:id', (req, res) => { modul_edit_soal(req, res) });


const sesi = require("./sesi/create")
const read_sesi = require("./sesi/read")
const update_sesi = require("./sesi/update")
const delete_sesi = require("./sesi/delete")

app.get("/read_sesi", (req, res) => { read_sesi(req, res) })
app.post("/tambah_sesi", (req, res) => { sesi(req, res) })
app.put("/update_sesi", (req, res) => { update_sesi(req, res) })
app.delete("/delete_sesi/:id", (req, res) => { delete_sesi(req, res) })


const db = require('./routes/dataBase')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './file/image/soal'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('photo'), (req, res) => {
  const finalImageURL = `${req.protocol}://${req.get('host')}/image/soal/${req.file.filename}`;
  const { id } = req.body;

  db.query(
    `UPDATE db_soal SET filesoal = ? WHERE id = ?`,
    [req.file.filename, id],
    (err, result) => {
      if (err) {
        console.error('Insert into database failed', err);
        return res.status(500).json({ text: 'Insert into database failed', stat: false });
      }

      res.status(200).json({
        text: 'Success',
        stat: true,
        data: { image: finalImageURL },
      });
    }
  );
});

//Endpoint tambah file gamabar opsi a
const storage_a = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './file/image/soal'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload_a = multer({ storage: storage_a });

app.post('/api/upload_a', upload_a.single('photo'), (req, res) => {
  const finalImageURL = `${req.protocol}://${req.get('host')}/image/soal/${req.file.filename}`;
  const { id } = req.body;
  const namofile = req.file.filename;

  db.query(
    `UPDATE db_soal SET file_a = ? WHERE id = ?`,
    [namofile, id],
    (err, result) => {
      if (err) {
        console.error('Insert into database failed', err);
        return res.status(500).json({ text: 'Insert into database failed', stat: false });
      }

      res.status(200).json({
        text: 'Success',
        stat: true,
        data: { image: finalImageURL },
      });
    }
  );
});


//Endpoint tambah file gamabar opsi b
const storage_b = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './file/image/soal'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload_b = multer({ storage: storage_b });

app.post('/api/upload_b', upload_b.single('photo'), (req, res) => {
  const finalImageURL = `${req.protocol}://${req.get('host')}/image/soal/${req.file.filename}`;
  const { id } = req.body;

  db.query(
    `UPDATE db_soal SET file_b = ? WHERE id = ?`,
    [req.file.filename, id],
    (err, result) => {
      if (err) {
        console.error('Insert into database failed', err);
        return res.status(500).json({ text: 'Insert into database failed', stat: false });
      }

      res.status(200).json({
        text: 'Success',
        stat: true,
        data: { image: finalImageURL },
      });
    }
  );
});

//Endpoint tambah file gamabar opsi c
const storage_c = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './file/image/soal'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload_c = multer({ storage: storage_c });

app.post('/api/upload_c', upload_c.single('photo'), (req, res) => {
  const finalImageURL = `${req.protocol}://${req.get('host')}/image/soal/${req.file.filename}`;
  const { id } = req.body;

  db.query(
    `UPDATE db_soal SET file_c = ? WHERE id = ?`,
    [req.file.filename, id],
    (err, result) => {
      if (err) {
        console.error('Insert into database failed', err);
        return res.status(500).json({ text: 'Insert into database failed', stat: false });
      }

      res.status(200).json({
        text: 'Success',
        stat: true,
        data: { image: finalImageURL },
      });
    }
  );
});

//Endpoint tambah file gamabar opsi d
const storage_d = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './file/image/soal'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload_d = multer({ storage: storage_d });

app.post('/api/upload_d', upload_d.single('photo'), (req, res) => {
  const finalImageURL = `${req.protocol}://${req.get('host')}/image/soal/${req.file.filename}`;
  const { id } = req.body;

  db.query(
    `UPDATE db_soal SET file_d = ? WHERE id = ?`,
    [req.file.filename, id],
    (err, result) => {
      if (err) {
        console.error('Insert into database failed', err);
        return res.status(500).json({ text: 'Insert into database failed', stat: false });
      }

      res.status(200).json({
        text: 'Success',
        stat: true,
        data: { image: finalImageURL },
      });
    }
  );
});

//Endpoint tambah file gamabar opsi e
const storage_e = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './file/image/soal'));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload_e = multer({ storage: storage_e });

app.post('/api/upload_e', upload_e.single('photo'), (req, res) => {
  const finalImageURL = `${req.protocol}://${req.get('host')}/image/soal/${req.file.filename}`;
  const { id } = req.body;

  db.query(
    `UPDATE db_soal SET file_e = ? WHERE id = ?`,
    [req.file.filename, id],
    (err, result) => {
      if (err) {
        console.error('Insert into database failed', err);
        return res.status(500).json({ text: 'Insert into database failed', stat: false });
      }

      res.status(200).json({
        text: 'Success',
        stat: true,
        data: { image: finalImageURL },
      });
    }
  );
});

/////////////////////////////////////////////////////////////////////////////////////
//  BAGIAN USER
/////////////////////////////////////////////////////////////////////////////////////


const { read_kelas_user, read_ujian_user, read_jawaban_pilihan_user, read_nomor_terisi_user, read_durasi_ujian } = require("./user/sesi/index")

app.get("/read_kelas_user", (req, res) => { read_kelas_user(req, res) })

app.get("/read_ujian_user/:id", (req, res) => { read_ujian_user(req, res) })

app.get("/read_durasi_ujian/:id", (req, res) => { read_durasi_ujian(req, res) })


const { getimage, jawabansiswa2, jawabansiswa, jawabansiswa4 } = require("./user/jawaban/create")

const { jawabansiswa5, calculate_nilai } = require("./user/jawaban/validasi")

app.get("/get-img/:path", (req, res) => { getimage(req, res) })

app.post('/jawaban_user/:id', (req, res) => { jawabansiswa4(req, res) });

app.post('/jawaban_user_complete/:id', (req, res) => { jawabansiswa2(req, res) });

app.get("/read_jawaban_pilihan_user/:id/:dbsoal", (req, res) => { read_jawaban_pilihan_user(req, res) })

app.get("/read_nomor_terisi_user/:id", (req, res) => { read_nomor_terisi_user(req, res) })

app.get("/kalkulasi_nilai/:id", (req, res) => { calculate_nilai(req, res) })


const { read_data_siswa, status_ujian, read_status_ujian_siswa } = require("./user/sesi/verif")

app.get("/read_data_siswa", (req, res) => { read_data_siswa(req, res) })


app.get("/insert_data_siswa/:id", (req, res) => { status_ujian(req, res) })

app.get("/read_status_ujian_siswa/:id", (req, res) => { read_status_ujian_siswa(req, res) })


app.get('/getsiswa', (req, res) => {
  if (req.session.user) {
    // return console.log(req.session.user)
    return res.status(200).json({
      text: "Profile fetched",
      stat: true,
      data: { name: req.session.user.kelas }
    });
  } else {
    return res.status(404).json({
      text: "No user found in session",
      stat: false,
      data: null
    });
  }
});

const { Tambahpengumuman, read_pengumuman, delete_pengumuman } = require("./user/pengumuman/index")

app.post("/Tambah_pengumuman", (req, res) => Tambahpengumuman(req, res))

app.get("/read_pengumuman", (req, res) => { read_pengumuman(req, res) })

app.delete("/delete_pengumuman/:id", (req, res) => { delete_pengumuman(req, res) })

const { TambahforumKelas, read_forumKelas, delete_forumKelas } = require("./user/kelas/index")

app.post("/Tambah_forumkelas", (req, res) => TambahforumKelas(req, res))

app.get("/read_forumkelas", (req, res) => { read_forumKelas(req, res) })

app.delete("/delete_forumkelas/:id", (req, res) => { delete_forumKelas(req, res) })

const { read_siswa_kelas, read_siswa_nilai ,read_siswa_sesi_cbt, read_siswa_sesi_sekarang} = require("./laporanNilai/read");
const { ifError } = require('assert');
const { error } = require('console');
app.get("/read_siswa_kelas/:id", (req, res) => { read_siswa_kelas(req, res) })

app.get("/read_siswa_nilai/:kelas/:nama/:id", (req, res) => { read_siswa_nilai(req, res) })

app.get("/read_siswa_sesi_cbt/:kelas", (req, res) => { read_siswa_sesi_cbt(req, res) })


app.get("/read_siswa_sesi_sekarang/:id", (req, res) => { read_siswa_sesi_sekarang(req, res) })


const {mulai_waktu_ujian,refresh_waktu_ujian,get_waktu_ujian} = require("./user/sesi/waktu")

app.get("/mulai_ujian/:id", (req, res) => { mulai_waktu_ujian(req,res)})




// Jika ini di fetch atau apalah lupa saya berarti mulai ujian dan menyimpan waktu mulai
app.post('/api/ujian/mulai', (req, res) => {
refresh_waktu_ujian(req,res)});



app.get('/api/ujian/:id/durasi', (req, res) => {get_waktu_ujian(req,res)});

const {delete_Status_ujian, read_siswa_nilai2} = require("./laporanNilai/delete")

app.get("/delete_Status_ujian/:kelas/:nama/:id", (req, res) => { delete_Status_ujian(req, res) })

app.get("/read_siswa_nilai2/:kelas/:nama/:id", (req, res) => { read_siswa_nilai2(req, res) })

