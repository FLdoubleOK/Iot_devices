const path = require("path");
const fs = require("fs");
const uploadsFolder = path.join(__dirname, "../public/photo");

async function listFiles(req, res) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send("Unable to scan directory: " + err);
    } else {
      res.render("files", { files: files });
    }
  });
}

//Define a route to handle the file retrieval request.
async function func_GetAttachedFileInRegisterNo(req, res) {
  const RegisterNo = req.body.RegisterNo;
  // const subFolder_Step = req.params.Step;
  // console.log(RegisterNo);
  // return
  const subFolderPath = path.join(
    uploadsFolder,
    RegisterNo
    // subFolder_Step
  );
  // console.log(subFolderPath);
  try {
    const files = await fs.promises.readdir(subFolderPath);
    res.json({ files });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error retrieving files." });
  }
}

async function func_DeleteAttahedFiles(req, res) {
  const subFolder_RegisterNo = req.params.RegisterNo;
  const subFolder_Step = req.params.Step;
  const filename = req.params.filename;

  const filePath = path.join(
    uploadsFolder,
    subFolder_RegisterNo,
    subFolder_Step,
    filename
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error delteing files." });
    } else {
      res.json({ msg: "File deleted successfully." });
    }
  });
}

module.exports = {
  listFiles,
  func_DeleteAttahedFiles,
  func_GetAttachedFileInRegisterNo,
  func_DeleteAttahedFiles,
};