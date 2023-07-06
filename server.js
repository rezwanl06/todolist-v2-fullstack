require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to db
const client = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

client.connect()
  .then(() => {
    console.log("Connected to db!");
  })
  .catch((err) => {
    console.error("Error connecting to db:", err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Create and initialize schema
const schema = `
  DROP TABLE IF EXISTS TODOENTRIES;
  CREATE TABLE TODOENTRIES (
    id SERIAL PRIMARY KEY,
    entry TEXT NOT NULL
  );
`;

const initSchema = async () => {
  try {
    await client.query(schema);
    console.log('Schema initialized');
  } catch (error) {
    console.error('Error initializing schema:', error);
  }
};

initSchema();

// Routes
// '/' route
app.route('/')
  .get(async (req, res) => { // GET request
    try {
      const { rows } = await client.query(`SELECT * FROM TODOENTRIES;`);
      res.send(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => { // POST request to add a new entry
    const { entry } = req.body;

    try {
      await client.query(`INSERT INTO TODOENTRIES (entry) VALUES ($1);`, [entry]);
      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// 'date-time' route
app.route('/date-time')
  .get(async (req, res) => {    // Send date time for heading
    const currentDate = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const date = currentDate.toLocaleDateString('en-US', options);
    
    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const time = currentDate.toLocaleTimeString('en-US', timeOptions);
    
    res.json({
      date: date,
      time: time
    });
  });


// '/add_todo' route
app.route('/add_todo')
  .post(async (req, res) => {
    try {
      const { newItem } = req.body;
  
      // Insert the new item into the TodoEntries table
      const insertQuery = 'INSERT INTO todoentries (entry) VALUES ($1)';
      await client.query(insertQuery, [newItem]);
  
      res.status(201).json({ message: 'New item added successfully' });
    } catch (error) {
      console.error('Error adding new item:', error);
      res.status(500).json({ message: 'Error adding new item' });
    }
  })

// /delete route
app.route('/delete/:id')
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      await client.query('DELETE FROM todoentries WHERE id = $1', [id]);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Error deleting item' });
    }
  });



// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
