//server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const homeSliderRoutes = require('./routes/homeSliderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/homeSlider', homeSliderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
