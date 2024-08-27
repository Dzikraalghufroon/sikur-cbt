const db = require('../routes/dataBase');

const convertToMySQLDateTime = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
};

const Update_sesi_cbt = (req, res) => {
  const { id, status, jadwal, jadwal_berakhir } = req.body;

  const formattedJadwal = convertToMySQLDateTime(jadwal);
  const formattedJadwalBerakhir = convertToMySQLDateTime(jadwal_berakhir);

  const sql = `UPDATE sesi_cbt SET status = ?, jadwal = ?, jadwal_berakhir = ? WHERE id = ?`;
  const values = [status, formattedJadwal, formattedJadwalBerakhir, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updat sesi:', err);
      return res.status(500).json({ text: 'Error ngupdate data', stat: false });
    }

    //console.log('Update suckess:', result);
    res.status(200).json({ text: 'Update sukcess', stat: true });
  });
}

module.exports = Update_sesi_cbt;



//name = '${name}', bank_soal = '${banksoal}', ,jadwal = '${jadwal}',kelas = '${kelas}'

