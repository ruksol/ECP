const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const companyRoutes = require('./routes/companyRoutes');
const tenderRoutes = require('./routes/tenderRoutes');
const industryNewsRoutes = require('./routes/industryNewsRoutes');
const toolRoutes = require('./routes/toolRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded payload limit
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/news', industryNewsRoutes);
app.use('/api/tools', toolRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred' });
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});