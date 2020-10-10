const DB_connection = require("../database/db_connection");

function checkExistenceRanked(rankPosition) {
  let checkExistenceRankedSQL = `
    select * from tb_book 
    where vl_rankPosition = ${rankPosition}
  `;
  return new Promise((resolve, reject) => {
    DB_connection.query(checkExistenceRankedSQL, (error, results, fields) => {
      if (error) return reject(error);
      let result;
      if (results.length == 0) result = null;
      else result = results[0].cd_book;

      resolve(result);
    });
  });
}
module.exports = checkExistenceRanked;
