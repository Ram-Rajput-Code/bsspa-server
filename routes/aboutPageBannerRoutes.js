const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllBanners, addBanner, updateBanner, deleteBanner } = require('../models/aboutPageBannerModel');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get all banners
router.get('/', (req, res) => {
    getAllBanners((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Upload a new banner
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    addBanner(req.file.filename, (err, newBanner) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(newBanner);
    });
});

// Update a banner
router.put('/update/:id', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    updateBanner(req.params.id, req.file.filename, (err, updatedBanner) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(updatedBanner);
    });
});

// Delete a banner
router.delete('/:id', (req, res) => {
    deleteBanner(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Banner deleted successfully' });
    });
});

module.exports = router;
