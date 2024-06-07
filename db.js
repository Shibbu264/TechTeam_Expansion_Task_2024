const mongoose = require('mongoose');

const dbName = 'registration_db';  
const mongoURL = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connected to MongoDB. Database: ${dbName}`);
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;