const express = require("express");
const routes = express.Router();

const BookController = require("./controllers/BookController");

routes.get("/", BookController.index);
routes.post("/register-book", BookController.store);
routes.put("/update-book", BookController.update);
routes.delete("/delete-book", BookController.destroy);

module.exports = routes;
