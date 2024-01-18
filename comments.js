// Create Web Server

// Import express module
const express = require('express');
// Create express object
const app = express();

// Import body-parser module
const bodyParser = require('body-parser');
// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Import mysql module
const mysql = require('mysql');
// Set mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my-nodeapp-db'
});
// Connect mysql
connection.connect();

// Set ejs
app.set('views', './views');
app.set('view engine', 'ejs');

// Set public directory
app.use(express.static('public'));

// Set routing
app.get('/', (req, res) => {
  // Select data from mysql
  connection.query(
    'SELECT * FROM mydata',
    // Callback function
    (error, results) => {
      // Render index.ejs
      res.render('index', { title: 'Hello!', data: results });
    }
  );
});

// Set routing
app.get('/add', (req, res) => {
  // Render add.ejs
  res.render('add', { title: 'Add new data' });
});

// Set routing
app.post('/add', (req, res) => {
  // Insert data into mysql
  connection.query(
    'INSERT INTO mydata SET ?',
    req.body,
    // Callback function
    (error, results) => {
      // Redirect to root
      res.redirect('/');
    }
  );
});

// Set routing
app.get('/edit', (req, res) => {
  // Select data from mysql
  connection.query(
    'SELECT * FROM mydata WHERE id=?',
    [req.query.id],
    // Callback function
    (error, results) => {
      // Render edit.ejs
      res.render('edit', { title: 'Edit data', data: results[0] });
    }
  );
});

// Set routing
app.post('/edit', (req, res) => {
  // Update data in mysql
  connection.query(
    'UPDATE mydata SET name=?, mail=?, age=? WHERE id=?',
    [req.body.name, req.body.mail, req.body.age, req.body.id],
    // Callback function
    (error, results) => {
      // Redirect to root
      res.redirect('/');
    }
});