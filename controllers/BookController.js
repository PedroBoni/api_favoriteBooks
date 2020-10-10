const DB_connection = require("../database/db_connection");
const checkExistenceRanked = require("../functions/checkExistenceRanked");
const getLastRank = require("../functions/getLastRank");
const alterRankBook = require("../functions/alterRankBook");
const getRankBook = require("../functions/getRankBook");

module.exports = {
  async index(req, res) {
    DB_connection.query(
      "select * from tb_book order by vl_rankPosition asc",
      (error, results, fields) => {
        if (error) res.json(error);
        return res.json(results);
      }
    );
  },

  async store(req, res) {
    let body = req.body;

    checkExistenceRanked(body.rankPosition)
      .then((resultCheckExistenceRank) => {
        getLastRank()
          .then((lastRank) => {
            let rankPosition;
            if (lastRank != null) {
              let newLastRank = lastRank + 1;
              console.log(lastRank);
              if (resultCheckExistenceRank != null) {
                alterRankBook(resultCheckExistenceRank, newLastRank)
                  .then((successMsg) => console.log(successMsg))
                  .catch((errMsg) => console.log(errMsg));
              }
              rankPosition =
                body.rankPosition > newLastRank
                  ? newLastRank
                  : body.rankPosition;
            } else {
              rankPosition = 1;
            }

            let registerBookSQL = `
              insert into tb_book 
              (vl_rankPosition, nm_book, url_bookCover) values 
              (${rankPosition}, '${body.nameBook}', '${body.urlBookCover}')
            `;
            DB_connection.query(registerBookSQL, (error, results, fields) => {
              if (error) res.json(error);
              return res.json(results);
            });
          })
          .catch((error) => {
            console.log(error);
            return res.json({ error: error });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.json({ error: error });
      });
  },
  async update(req, res) {
    let body = req.body;

    getLastRank().then((lastRank) => {
      let rankCheck =
        body.rankPosition > lastRank ? lastRank : body.rankPosition;

      checkExistenceRanked(rankCheck).then((resultCheckExistenceRank) => {
        getRankBook(body.codeBook).then((rankBook) => {
          alterRankBook(body.codeBook, 99999);
          alterRankBook(resultCheckExistenceRank, rankBook);
          alterRankBook(body.codeBook, rankCheck);
        });
      });
    });

    let updateBookSQL = `
      update tb_book set
      nm_book = '${body.nameBook}',
      url_bookCover = '${body.urlBookCover}'
      where cd_book = ${body.codeBook}
    `;
    DB_connection.query(updateBookSQL, (error, results, fields) => {
      if (error) res.json(error);
      return res.json(results);
    });
  },
  async destroy(req, res) {
    let codeBook = req.query.id;

    let deleteBookSQL = `
      DELETE FROM tb_book
      WHERE cd_book = ${codeBook};
    `;

    getRankBook(codeBook).then((rankBook) => {
      DB_connection.query(deleteBookSQL, (error, results, fields) => {
        if (error) res.json(error);
        console.log("deleted with success");
      });

      let getBooksSQL = `
        select * from tb_book
        where vl_rankPosition > ${rankBook}
        order by vl_rankPosition asc
      `;

      DB_connection.query(getBooksSQL, (error, results, fields) => {
        if (error) res.json(error);
        for (let i = 0; i < results.length; i++) {
          alterRankBook(results[i].cd_book, results[i].vl_rankPosition - 1);
        }
        return res.send("deleted with success");
      });
    });
  },
};
