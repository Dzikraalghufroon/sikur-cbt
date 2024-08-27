const multer = require('multer');
const path = require('path');
const db = require("../routes/dataBase");

function createStorage(destinationFolder) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, destinationFolder));
        },
        filename: function (req, file, cb) {
            const uniqueName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        }
    });
}


function createUploadHandler(field, dbField) {
    const upload = multer({ storage: createStorage('../file/image/soal') });

    return function(req, res) {
        const finalImageURL = `${req.protocol}://${req.get('host')}/image/soal/${req.file.filename}`;
        const { id } = req.body;

        db.query(
            `UPDATE db_soal SET ${dbField} = ? WHERE id = ?`, 
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
    };
}

module.exports = {
    uploadA: createUploadHandler('photo', 'file_a'),
    uploadB: createUploadHandler('photo', 'file_b'),
    uploadC: createUploadHandler('photo', 'file_c'),
    uploadD: createUploadHandler('photo', 'file_d'),
    uploadE: createUploadHandler('photo', 'file_e'),
};
