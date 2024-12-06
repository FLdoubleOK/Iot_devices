const sql = require('mssql');

const config = {
  user :"p8344",
  password:"660176",
  server:"10.10.154.152",
  database:"MED_IoTO",
  port:1433,
  options:{
    encrypt:false,
    trustServerCertificate: true,
  },
};

module.exports = {
 config
}


