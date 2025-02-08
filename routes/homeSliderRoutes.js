//routes\homeSliderRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllImages, addImage, deleteImage } = require('../models/homeSliderModel');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get all images
router.get('/', (req, res) => {
    getAllImages((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Upload a new image
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    addImage(req.file.filename, (err, newImage) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(newImage);
    });
});

// Delete an image
router.delete('/:id', (req, res) => {
    deleteImage(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Image deleted successfully' });
    });
});

module.exports = router;
