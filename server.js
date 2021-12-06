const dotenv = require('dotenv').config();
const app = require('./app');
const { connectToDB } = require('./db');

const PORT = process.env.PORT || 3000;

function connctToServer() {
  app.listen(PORT, () => console.log('Соединение с сервером'));
}

connectToDB()
  .then(connctToServer)
  .catch(process.exit);
