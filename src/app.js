const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://dhiraj579:dhiraj579@cluster0.grf2f7z.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
const checkInRoutes = require('./routes/checkInRoutes');
const checkOutRoutes = require('./routes/checkOutRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/api/checkin', checkInRoutes);
app.use('/api/checkout', checkOutRoutes);
app.use('/api/report', reportRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
