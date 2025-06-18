const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'internship_db'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Create database if not exists
  connection.query('CREATE DATABASE IF NOT EXISTS internship_db', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database internship_db ensured');

    // Switch to the database
    connection.query('USE internship_db', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log('Selected database internship_db');
    });
  });
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Routes
// Form page
app.get('/', (req, res) => {
  res.render('form', { errors: [], formData: {} });
});

// Form submission
app.post('/submit', (req, res) => {
  const { first_name, last_name, email, phone, motivation } = req.body;
  const errors = [];

  // Input validation
  if (!first_name || first_name.length < 2) {
    errors.push('First name is required and must be at least 2 characters');
  }
  if (!last_name || last_name.length < 2) {
    errors.push('Last name is required and must be at least 2 characters');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required');
  }
 const cleanedPhone = phone ? phone.replace(/[^\d]/g, '') : '';

if (!phone || cleanedPhone.length < 7) {
  errors.push('Phone number must have at least 7 digits');
}

  if (!motivation || motivation.length < 20) {
    errors.push('Motivation must be at least 20 characters');
  }

  if (errors.length > 0) {
    return res.render('form', { 
      errors, 
      formData: req.body 
    });
  }

  // Insert into database
  const query = 'INSERT INTO candidates (first_name, last_name, email, phone, motivation) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [first_name, last_name, email, phone, motivation], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      errors.push('Error saving data. Email might already exist.');
      return res.render('form', { errors, formData: req.body });
    }
    res.redirect('/candidates');
  });
});

// Candidates list page
app.get('/candidates', (req, res) => {
  connection.query('SELECT * FROM candidates ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Error fetching candidates:', err);
      return res.status(500).send('Database query error');
    }
    res.render('candidates', { candidates: results });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});