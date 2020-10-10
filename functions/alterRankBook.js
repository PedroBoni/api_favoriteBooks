const DB_connection = require("../database/db_connection");

function alterRankBook(codeBook, rankValue) {
  let alterRankBookSQL = `
    UPDATE tb_book
    SET vl_rankPosition = ${rankValue}
    WHERE cd_book = ${codeBook};
  `;

  return new Promise((resolve, reject) => {
    DB_connection.query(alterRankBookSQL, (error, results, fields) => {
      if (error) reject("failed to change rank");
      resolve("successful rank exchange");
    });
  });
}

module.exports = alterRankBook;
