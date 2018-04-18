var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

const deleteReserve = require('./controllers/reserveController').deleteReserve;

var reserve = [
  {
    tableNo: 1,
    name: 'Nick',
    uniqueID: 'cop',
    phone: '777-777-7777',
  },
];
var waitList = [
  {
    name: 'TJ',
    uniqueID: 'cop2',
    phone: '777-777-7777',
  },
];

const TABLES = 15;

// Sets up the Express app to handle data parsing
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/tables', function(req, res) {
  res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/reserve', function(req, res) {
  res.sendFile(path.join(__dirname, 'reserve.html'));
});

app.get('/api/tables', function(req, res) {
  return res.json(reserve);
});

app.get('/api/waitList', function(req, res) {
  return res.json(waitList);
});

app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});

app.post('/api/new', (req, res) => {
  var newReservation = req.body;
  console.log(newReservation);

  newReservation.uniqueID = newReservation.name + new Date().getTime();

  if (reserve.length < TABLES) {
    newReservation.tableNo = reserve.length + 1;

    reserve.push(newReservation);
    res.json({
      status: 'booked',
      id: newReservation.uniqueID,
    });
  } else {
    waitList.push(newReservation);

    res.json({
      status: 'waitlisted',
      id: newReservation.uniqueID,
    });
  }
});
app.post('/api/remove', (req, res) => deleteReserve(req, res, reserve, waitList));
