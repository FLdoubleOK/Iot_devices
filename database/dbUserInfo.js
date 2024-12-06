const sql = require('mssql');
const dbConfig = require('./config');

// async function SelectUserInforByNID(nid) {
//   try {
//     const pool = await sql.connect(dbConfig.config);
//     const request = new sql.Request(pool);
//     request.input('nid', sql.NVarChar, nid);
//     const result = await request.execute('SelectUserInfoToCheckRoleByNID');
//     await pool.close();
//     return result.recordset;
//   } catch (error) {
//     console.error(error);
//   }
// }

async function SelectUserInforByNID(nid) {
    let pool = null;
    try {
        pool = await sql.connect(dbConfig.config);
        const result = await pool
            .request()
            .input('nid', sql.NVarChar, nid)
            .execute('SelectUserInfoToCheckRoleByNID');
        return result.recordset;
    } catch (error) {
        console.error('Error occurred:', error.message || error);
        return { error: 'An error occurred while fetching user information.' };
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (err) {
                console.error('Error closing the connection pool:', err.message || err);
            }
        }
    }
}

module.exports = {
    SelectUserInforByNID,
};
