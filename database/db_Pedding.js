const sql = require('mssql');
const dbConfig = require("./config");



async function listStatus(NID) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('NID', sql.NVarChar, NID)
      const result = await request.execute('select_view_StockRequest');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function inputModal(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_StatusRequest');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function DeleteRequestAdd(ID) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      const result = await request.execute('Delete_RequestPendingAdd');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
async function DeleteRequestPending(ID) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      const result = await request.execute('Delete_RequestPendingReq');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

module.exports = {
   listStatus
   , inputModal
   , DeleteRequestAdd
   , DeleteRequestPending
}
