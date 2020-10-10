const DB_connection = require("../database/db_connection");

function getLastRank() {
  let getLastRankSQL = `
    select * from tb_book 
    order by vl_rankPosition asc;
  `;
  return new Promise((resolve, reject) => {
    DB_connection.query(getLastRankSQL, (error, results, fields) => {
      if (error) reject(error);
      console.log(results);
      if (Array.isArray(results) && results.length)
        resolve(results[results.length - 1].vl_rankPosition);
      else resolve(null);
    });
  });
}

module.exports = getLastRank;
