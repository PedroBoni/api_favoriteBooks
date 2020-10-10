const DB_connection = require("../database/db_connection");

function getRankBook(codeBook) {
  let getRankBookSQL = `
    select * from tb_book 
    where cd_book = ${codeBook};
  `;
  return new Promise((resolve, reject) => {
    DB_connection.query(getRankBookSQL, (error, results, fields) => {
      if (error) reject(error);
      resolve(results[0].vl_rankPosition);
    });
  });
}

module.exports = getRankBook;
