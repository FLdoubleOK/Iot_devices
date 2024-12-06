const sql = require('mssql');
const dbConfig = require("./config");

//  /------------------------------ New Request--------------------------/
async function listNewrequest() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_view_listNewRequest');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function selectlistRequest() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_category');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


async function searchlistNewRequest(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchlistNewRequest');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}



// /-----------------------------New Request---------------------------------------/

// /----------- History Request------------/

async function HistoryRequest() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_HistoryRequestAll');
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
      const result = await request.execute('where_searchlistNewRequest');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function HistoryRequestInModal(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchlistNewRequest');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function searchistoryRequest(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_SearchHistoryRequestAllBykeywords');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
// /----------- End History Request------------/

// /----------------------------- New Devices---------------------------------------/
async function listNewDevices() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_view_listNewDevices');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function searchlistNewDevice(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchlistNewDevice');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


async function inputModalDevice(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchlistNewDevice');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


// /----------- History add all------------/
async function listAddallDevice() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_view_listAddAll');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function searchistory(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchAddAll');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
async function itemmodel(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchAddAllByitemcode');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
async function Update_Position(ID, Position) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Position', sql.NVarChar, Position)
      const result = await request.execute('Update_Position');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


// /----------- Confrim------------/
async function ConfrimBorrow(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('Update_tbl_Confirm_Borrow');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
async function ConfrimNG(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('Update_tbl_Confirm_NG_Staff');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


async function ConfrimReturn(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('Update_tbl_Confirm_Return');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function ButtonReject(ID, Remark) {
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


// ConfirnADD
async function ConfirmADD(ID, Position, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      request.input('Position', sql.NVarChar, Position)
      const result = await request.execute('Update_tbl_Confirm_ADD');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function RejectADD(ID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      request.input('Remark', sql.NVarChar, Remark)
      const result = await request.execute('Update_tbl_Reject_ADD');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
// /------------------ Order wait Send -----------------/
async function OrderwaitSend() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('[dbo].[select_view_listWaitSendOrder]');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function UpdateStatusOrder(ID) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID', sql.NVarChar, ID)
      const result = await request.execute('Update_InChargeStatus');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function Where_itemOrder(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('[dbo].[Where_itemOrder]');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
module.exports = {
   listNewrequest,
   selectlistRequest,
   searchlistNewRequest,
   listNewDevices,
   listAddallDevice,
   searchlistNewDevice,
   searchistory,
   inputModal,
   inputModalDevice,
   ConfrimBorrow,
   ConfrimReturn,
   ButtonReject,
   ConfirmADD,
   RejectADD,
   HistoryRequest,
   HistoryRequestInModal,
   searchistoryRequest,
   ConfrimNG,
   itemmodel,
   Update_Position,
   OrderwaitSend,
   UpdateStatusOrder,
   Where_itemOrder
}
