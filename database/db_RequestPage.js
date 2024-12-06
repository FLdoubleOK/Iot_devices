
const sql = require('mssql');
const dbConfig = require("./config");

async function CategoryName() {
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


async function DeviceRemainTable() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('Select_viewListRemain');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function SelectCategory(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchstock');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function SearchInput(keywords, Category) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      request.input('Category', sql.NVarChar, Category)
      const result = await request.execute('where_searchinputstock');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function GetDataModel(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchstock');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

//เลือกแผนก
async function SelectDepModal() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_dep');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

// เลือกRequest
async function SelectRequestModel() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_Request');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function SelectManagmentModel(var1) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('Department', sql.NVarChar, var1)
      const result = await request.execute('where_Management');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function SelectInchageModel(Department) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('Department', sql.NVarChar, Department)
      const result = await request.execute('where_Inchage');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


//insert request
async function InsertBorrowModel(Request, ItemCode, Qty, Remark, DueDate, NID) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('Request', sql.NVarChar, Request)
      request.input('ItemCode', sql.NVarChar, ItemCode)
      request.input('Qty', sql.NVarChar, Qty)
      request.input('Remark', sql.NVarChar, Remark)
      request.input('DueDate', sql.NVarChar, DueDate)
      request.input('NID', sql.NVarChar, NID)
      const result = await request.execute('Insert_tbl_stockRequest_Borrow');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


async function InsertSupportModel(Request, ItemCode, Qty, Remark, NID, M_incharge, dept, nameIncharge) {
   try {
      console.log("Support");
      return
      // const pool = await sql.connect(dbConfig.config);
      // const request = new sql.Request(pool);
      // request.input('Request', sql.NVarChar, Request)
      // request.input('ItemCode', sql.NVarChar, ItemCode)
      // request.input('Qty', sql.NVarChar, Qty)
      // request.input('Remark', sql.NVarChar, Remark)
      // request.input('NID', sql.NVarChar, NID)
      // request.input('M_incharge', sql.NVarChar, M_incharge)
      // request.input('dept', sql.NVarChar, dept)
      // request.input('nameIncharge', sql.NVarChar, nameIncharge)
      // const result = await request.execute('Insert_tbl_stockRequest_Support');
      // await pool.close();
      // return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


async function InsertTransferModel(Request, ItemCode, Qty, Remark, NID, M_incharge, dept, nameIncharge) {
   try {
      console.log("Transfer");
      return
      // const pool = await sql.connect(dbConfig.config);
      // const request = new sql.Request(pool);
      // request.input('Request', sql.NVarChar, Request)
      // request.input('ItemCode', sql.NVarChar, ItemCode)
      // request.input('Qty', sql.NVarChar, Qty)
      // request.input('Remark', sql.NVarChar, Remark)
      // request.input('NID', sql.NVarChar, NID)
      // request.input('M_incharge', sql.NVarChar, M_incharge)
      // request.input('dept', sql.NVarChar, dept)
      // request.input('nameIncharge', sql.NVarChar, nameIncharge)
      // const result = await request.execute('Insert_tbl_stockRequest_Transfer');
      // await pool.close();
      // return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function InsertNG(Request, ItemCode, Qty, Remark, NID) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('Request', sql.NVarChar, Request)
      request.input('ItemCode', sql.NVarChar, ItemCode)
      request.input('Qty', sql.NVarChar, Qty)
      request.input('Remark', sql.NVarChar, Remark)
      request.input('NID', sql.NVarChar, NID)
      const result = await request.execute('Insert_tbl_stockRequest_NG');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


module.exports = {
   CategoryName,
   DeviceRemainTable,
   SelectCategory,
   SearchInput,
   GetDataModel,
   SelectDepModal,
   SelectRequestModel,
   SelectManagmentModel,
   SelectInchageModel,
   InsertBorrowModel,
   InsertSupportModel,
   InsertTransferModel,
   InsertNG
}
