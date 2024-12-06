const sql = require('mssql');
const dbConfig = require("./config");

async function listNewApproved() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_view_listNewApproved');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function listApproved() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_view_listApproved');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function searchApproved(var1) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, var1)
      const result = await request.execute('where_searchApproved');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function inputModalHistory(var1) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, var1)
      const result = await request.execute('where_searchApproved');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

// Confirm Approved 
async function ApprovedManager(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('Update_tbl_Confirm_Approved');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
async function ApprovedManagertransfer(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('[dbo].[Update_tbl_Confirm_Transfer]');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
async function ApprovedManagerNG(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('Update_tbl_Confirm_NG');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function RejectManager(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('Update_tbl_Reject_Request');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

module.exports = {
   listNewApproved,
   listApproved,
   searchApproved,
   inputModalHistory,
   ApprovedManager,
   RejectManager,
   ApprovedManagerNG,
   ApprovedManagertransfer

}
