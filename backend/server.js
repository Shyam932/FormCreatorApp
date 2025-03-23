
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formRoutes');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/api', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
