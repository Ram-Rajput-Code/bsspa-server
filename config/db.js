// config/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create tables if they do not exist
db.run(`
    CREATE TABLE IF NOT EXISTS homeSlider (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS AboutPageBanner (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL
    )
`);

module.exports = db;
