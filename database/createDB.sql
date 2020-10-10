create database book;

use book;

CREATE TABLE tb_book (
  cd_book INT NOT NULL AUTO_INCREMENT,
  vl_rankPosition INT NOT NULL unique,
  nm_book VARCHAR(300) NOT NULL,
  url_bookCover VARCHAR(2000) NOT NULL,
  PRIMARY KEY (`cd_book`)
)ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

select * from tb_book 
order by vl_rankPosition asc;