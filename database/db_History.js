const sql = require('mssql');
const dbConfig = require("./config");





async function listHistory(NID){
    try{
     const pool = await sql.connect(dbConfig.config);
     const request = new sql.Request(pool);
     request.input('NID',sql.NVarChar,NID)
     const result = await request.execute('select_view_HistoryofRequest');
     await pool.close();
     return result.recordset;
    } catch (error) {
     console.error(error);
    }
 }

 async function GetDataModel(ID){
   try{
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('ID',sql.Int,ID)
      const result = await request.execute('Where_listHistory');
      await pool.close();
      console.log(result.recordset);
      return result.recordset;
     } catch (error) {
      console.error(error);
     }
  }

  async function GetHistoryRequestBykeyword(keywords,NID){
   try{
      const pool = await sql.connect(dbConfig.config);
      const request = new sql.Request(pool);
      request.input('keywords',sql.NVarChar,keywords)
      request.input('NID',sql.NVarChar,NID)
      const result = await request.execute('GetHistoryRequestBykeyword');
      await pool.close();
      return result.recordset;
     } catch (error) {
      console.error(error);
     }
  }

  async function selectReturn(){
   try{
    const pool = await sql.connect(dbConfig.config);
    const request = new sql.Request(pool);
    const result = await request.execute('select_Return');
    await pool.close();
    return result.recordset;
   } catch (error) {
    console.error(error);
   }
}

// async function InsertReturn(Request, ItemCode, Qty, Remark, NID,ID2){
//    try{
//     const pool = await sql.connect(dbConfig.config);
//     const request = new sql.Request(pool);
//     request.input('Request',sql.NVarChar,Request)
//     request.input('ItemCode',sql.NVarChar,ItemCode)
//     request.input('Qty',sql.NVarChar,Qty)
//     request.input('Remark',sql.NVarChar,Remark)
//     request.input('NID',sql.NVarChar,NID)
//     request.input('ID2',sql.NVarChar,ID2)
//     const result = await request.execute('Insert_tbl_stockRequest_Return');
//     await pool.close();
//     return result.recordset;
//    } catch (error) {
//     console.error(error);
//    }
// }

async function UpdateReturn(ID,Remark){
   try{
    const pool = await sql.connect(dbConfig.config);
    const request = new sql.Request(pool);
    request.input('ID',sql.NVarChar,ID)
    request.input('Remark',sql.NVarChar,Remark)
    const result = await request.execute('Update_RequestReturn');
    await pool.close();
    return result.recordset;
   } catch (error) {
    console.error(error);
   }
}


module.exports = {
   listHistory,
   GetDataModel,
   selectReturn,
   UpdateReturn,
   GetHistoryRequestBykeyword
}

