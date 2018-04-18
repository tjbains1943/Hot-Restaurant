var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

var reserve = [];
var waitList = [];

const TABLES = 15;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "tabels.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(reserve);
});

app.get("/api/waitList", function (req, res) {
    return res.json(waitList);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});