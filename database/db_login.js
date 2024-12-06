
const sql = require('mssql');
const dbConfig = require("./config");

// async function User(NID){
//     try{
//        const pool = await sql.connect(dbConfig.config);
//        const request = new sql.Request(pool);
//        request.input('NID',sql.NVarChar,var1)
//        const result = await request.execute('where_User');
//        await pool.close();
//        return result.recordset;
//       } catch (error) {
//        console.error(error);
//       }
//    }

async function SelectUserInfoByNID(nid) {
  let pool = null;
  try {
    const pool = await sql.connect(dbConfig.config);
    const request = new sql.Request(pool);
    request.input('nid', sql.NVarChar, nid);
    const result = await request.execute(
      '[NTC_DBSharing].[dbo].[SelectUserInfoByNID]'
    );
    console.log(result);
    return { success: true, data: result.recordset };
  } catch (error) {
    console.error(error);
    const errorMessage =
      'An error occurred while retrieving user information. Please try again later.';
    return { success: false, message: errorMessage };
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}
module.exports = { SelectUserInfoByNID };
 