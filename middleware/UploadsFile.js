const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.body.RegisterNo;
    // const materialGrade = req.body.MaterialGrade;

    const dest = path.join(
      __dirname,
      `../public/photo/${folderName}`
      //   `../uploads/${folderName}/${materialGrade}`
    );

    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    let newFileName;

    const RegisterNo = req.body.RegisterNo;
    newFileName = `${RegisterNo}${fileExt}`;

    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;