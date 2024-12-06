const sql = require('mssql');
const dbConfig = require("./config");

async function listAddNew() {
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
async function RunItemCode() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      //  request.input('ExampleVar',sql.NVarChar,Var1)
      const result = await request.execute('select_AutoItemCode');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function SearchType(Category, keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('Category', sql.NVarChar, Category)
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchType');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
async function SearchTypekeywords(keywords) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, keywords)
      const result = await request.execute('where_searchTypekeywords');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function select_category() {
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

async function select_Vender() {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      const result = await request.execute('select_Vender');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}

async function searchdevice(var1) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords', sql.NVarChar, var1)
      const result = await request.execute('where_searchAddAll');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}


async function AddNewDevice(Category, Type, Qty, Description, Price, VendorName, NID, Remark) {
   try {
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('Category', sql.NVarChar, Category)
      request.input('Type', sql.NVarChar, Type)
      request.input('Description', sql.NVarChar, Description)
      request.input('Price', sql.NVarChar, Price)
      request.input('Qty', sql.NVarChar, Qty)
      request.input('Remark', sql.NVarChar, Remark)
      request.input('VendorName', sql.NVarChar, VendorName)
      request.input('NID', sql.NVarChar, NID)
      const result = await request.execute('Insert_tbl_addNewDevices');
      await pool.close();
      return result.recordset;
   } catch (error) {
      console.error(error);
   }
}
module.exports = {
   listAddNew,
   select_category,
   searchdevice,
   AddNewDevice,
   select_Vender,
   RunItemCode,
   SearchType,
   SearchTypekeywords

}
