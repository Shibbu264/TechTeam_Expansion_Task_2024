const express = require('express');
const cors = require('cors');  
const app = express();


const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],  
  allowedHeaders: ['Content-Type']  
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const registrationRoutes = require('./routes/registrationRoutes');
app.use('/', registrationRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});