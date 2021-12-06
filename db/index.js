const { sequelize } = require('./models');

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных прошло успешно');
  } catch (err) {
    console.log('Произошла ошибка соединения с базой данных: \n%o', err);
    throw new Error(err);
  }
}

module.exports = { connectToDB };
