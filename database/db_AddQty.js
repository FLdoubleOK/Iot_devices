const sql = require('mssql');
const dbConfig = require("./config");

async function listAddQty(){
    try{
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

 async function select_category(){
  try{
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

async function searchdevice(keywords){
  try{
   const pool = await sql.connect(dbConfig.config);
   const request = new sql.Request(pool);
   request.input('keywords',sql.NVarChar,keywords)
   const result = await request.execute('where_searchAddAll');
   await pool.close();
   return result.recordset;
  } catch (error) {
   console.error(error);
  }
}

async function inputModal(keywords){
  try{
     const pool = await sql.connect(dbConfig.config);
     const request = new sql.Request(pool);
     request.input('keywords',sql.NVarChar,keywords)
     const result = await request.execute('where_searchAddAll');
     await pool.close();
     return result.recordset;
    } catch (error) {
     console.error(error);
    }
 }

 async function searchinput(keywords,Category){
  try{
   const pool = await sql.connect(dbConfig.config);
   const request = new sql.Request(pool);
   request.input('keywords',sql.NVarChar,keywords)
   request.input('Category',sql.NVarChar,Category)
   const result = await request.execute('where_searchAddQty2');
   await pool.close();
   return result.recordset;
  } catch (error) {
   console.error(error);
  }
}


async function AddQtyDevice(ItemCode,Qty,Remark,NID){
  try{
   const pool = await sql.connect(dbConfig.config);
   const request = new sql.Request(pool);
   request.input('ItemCode',sql.NVarChar,ItemCode)
   request.input('Qty',sql.NVarChar,Qty)
   request.input('Remark',sql.NVarChar,Remark)
   request.input('NID',sql.NVarChar,NID)
   const result = await request.execute('Insert_tbl_AddQtyDevices');
   await pool.close();
   return result.recordset;
  } catch (error) {
   console.error(error);
  }
}

 module.exports = {
   listAddQty,
   select_category,
   searchdevice,
   inputModal,
   searchinput,
   AddQtyDevice
   

 }
 