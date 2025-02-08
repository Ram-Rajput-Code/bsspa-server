const db = require("../config/db");

// Get all banners
const getAllBanners = (callback) => {
  db.all("SELECT * FROM AboutPageBanner", [], callback);
};

// Add new banner
const addBanner = (image, callback) => {
  db.run("INSERT INTO AboutPageBanner (image) VALUES (?)", [image], function (err) {
    callback(err, { id: this.lastID, image });
  });
};

// Update a banner
const updateBanner = (id, newImage, callback) => {
  db.run("UPDATE AboutPageBanner SET image = ? WHERE id = ?", [newImage, id], function (err) {
    callback(err, { id, image: newImage });
  });
};

// Delete a banner
const deleteBanner = (id, callback) => {
  db.run("DELETE FROM AboutPageBanner WHERE id = ?", [id], callback);
};

module.exports = { getAllBanners, addBanner, updateBanner, deleteBanner };
