
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3001

//ให้ front call หา back end
app.use(cors());

// app.set("view engine", "ejs");
//set the view engine to EJS. ไฟล์โปรเจคห้อยท้ายด้วย view เพื่อให้ back รู้ว่าเรียกใช้ landerไหน   url ให้ user ไม่รู้ ไม่ต้อง encip
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
// app.use("/pictures", express.static(path.join(__dirname, "/pictures")));
app.use("/js", express.static(path.join(__dirname, "js")))
app.use("/photo", express.static(path.join(__dirname, "photo")))
app.use("/css", express.static(path.join(__dirname, "css")))
app.use('/axios', express.static(path.join(__dirname, 'node_modules', 'axios')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap')));
app.use('/bootstrap-icons', express.static(path.join(__dirname, 'node_modules', 'bootstrap-icons')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


const iotoDeviceRoute = require('./routes/iotoDeviceRoute');
const { count } = require('console');

app.use('/devices', iotoDeviceRoute);

// const upload = multer({dest: "uploads/"});
// app.post('/upload',upload.array('file',2),(req,res) =>{
//   res.json('req.file');
// })
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});