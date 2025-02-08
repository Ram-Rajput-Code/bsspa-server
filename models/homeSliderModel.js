//models/homeSliderModel.js
const db = require('../config/db');

// Get all images
const getAllImages = (callback) => {
    db.all('SELECT * FROM homeSlider', [], callback);
};

// Add new image
const addImage = (image, callback) => {
    db.run('INSERT INTO homeSlider (image) VALUES (?)', [image], function (err) {
        callback(err, { id: this.lastID, image });
    });
};

// Delete an image
const deleteImage = (id, callback) => {
    db.run('DELETE FROM homeSlider WHERE id = ?', [id], callback);
};

module.exports = { getAllImages, addImage, deleteImage };
