                          git init //если git не подключен
npm init -y 
                          npm i //если package.json уже стоит
npx create-gitignore Node
npx eslint --init

                          npm i -D jest //если нужны тесты

                          в package.json прописать в скриптах "test": "jest -i", //для запуска тестов
                          npm test //запуск теста      или
                          npm jest //запуск теста

npm i express sequelize pg pg-hstore morgan hbs
npm i -D sequelize-cli nodemon
                                              "scripts": {
                                                  "start": "node server", // для запуска сервера
                                                  "dev": "nodemon server"
                                                },
npx sequelize-cli init
                                  npx sequelize db:create
                                  npx sequelize-cli model:generate --name имя_модели(таблицы) --attributes имя_колонки1:string,имя_колонки2:string,имя_колонки3:string

                                  npx sequelize-cli db:migrate
                                  
                                  npx sequelize-cli seed:generate --name имя_миграции
                                  npx sequelize-cli db:seed:all


                                  npx sequelize-cli db:migrate:undo:all  //отмена миграции

npm i cookie-parser 
// Middleware для чтения заголовка запроса Cookie и создания объекта req.cookies на основе его содержимого.

                                  const cookieParser = require('cookie-parser');
                                  app.use(cookieParser());

                                  document.cookie // Геттер, возвращает строку со всеми доступными куками.
                                  document.cookie = 'myCookie=the best cookie'; // Сеттер для добавления или перезаписи куки с таким же именем.

                                  res.clearCookie('user_id'); // Удалить куку с сервера по ключу

npm i express-session 
// Middleware для генерации сессий и отправки куки с id сессии на клиент.
                      // Создаёт объект req.session, который сохраняется между запросами.



                      const session = require('express-session');

                      const sessionConfig = {
                      name: 'sid',                                  // Имя куки для хранения id сессии. По умолчанию - connect.sid
                      secret: `${process.env.SESSION_SECRET}`,      // секретное слово для шифрование, может быть любым
                      resave: false,                                // Пересохранять ли куку при каждом запросе
                      saveUninitialized: false,                     // Создавать ли сессию без инициализации ключей в req.session cookie: {
                        maxAge: 1000 * 60 * 60 * 12,                // Срок истечения годности куки в миллисекундах
                        httpOnly: true,                             // Серверная установка и удаление куки, по умолчанию true },
                      };
                      app.use(session(sessionConfig));



                      
npm i session-file-store 
// Хранение сессии в файле
                                                                          Хранилище для сессий в виде файлов. Создаёт папку sessions на сервере.
                                                                          1. Эту папку нужно добавить в файл .gitignore
                                                                          2. Если используете nodemon, то игнорируйте эту папку в
                                                                          скрипте запуска в файле package.json
                                                                          "dev": "nodemon server.js --ignore ./sessions"

                                                                          const session = require('express-session');
                                                                          const FileStore = require('session-file-store')(session);
                                                                          const sessionConfig = {
                                                                          store: new FileStore(),
                                                                          /* ... */
                                                                          };
                                                                          app.use(session(sessionConfig));

npm i dotenv 
// для .env файла
                                      HOST=
                                      USRE=
                                      PORT=

                                      const dotenv = require('dotenv').config();
npm i bcrypt 
// хэширование
                            const bcrypt = require('bcrypt')
                            const hash = await bcrypt.hash(req.body.password, 10); // хэширование
                            const isSame = await bcrypt.compare(req.body.password, user.password); // сравнение паролей


Для деплоя на Хироку
"production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }

1. Довести локальную разработку до завершения определенного этапа, после которого изменения нужно задеплоить
2. Зайти на http://heroku.com, авторизоваться там
3. Создать heroku-приложение
4. Выбрать способ деплоя: через Github или через heroku-cli (на лекции работаем через cli, далее инструкция по нему)
5. Установить heroku-cli: https://devcenter.heroku.com/articles/heroku-cli
6. Залогиниться в него со своего ПК: `heroku login`
7. Создать удалённый гит-репозиторий под названием "heroku" для своего приложения: `heroku git:remote -a {{название вашего приложения на хероку из п.3}}`
8. Залить текущее состояние приложения в heroku-репозиторий `git push heroku main`, если хотите залить изменения ИЗ другой ветки в heroku/main, то читаем здесь https://devcenter.heroku.com/articles/git#deploying-from-a-branch-besides-main

ЗАЛИВАЕМ БАЗУ

9. Добавить аддон с PostgreSQL базой к своему приложению (с бесплатным тарифом Hobby Dev): `heroku addons:create heroku-postgresql:hobby-dev`
10. (опционально) Посмотреть содержимое переменной окружения DATABASE_URL: `heroku config:get DATABASE_URL`
11. Обновить config.json для использования переменных окружения и настройки SSL
12. Залить изменения через heroku push
13. Запустить миграцию удаленно `heroku run npx sequelize-cli db:migrate`

ВАЖНО
- heroku по умолчанию, если есть такой выбор, выбирает production-конфигурации, в том числе это касается баз данных, поэтому при деплое нас интересует именно эта конфигурация
- выбранная конфигурация приложения (development / production), как правило, находится в переменной process.env.NODE_ENV и доступна в коде, который исполняется в nodejs. если в режиме разработки вам нужны одни значения, а в продакшене - другие (например, свойство secure в конфиге куки для сессии), их можно задавать на основе значения этой переменной (например {cookie: {secure: process.env.NODE_ENV === 'production' }}), если равенство верное, то значение secure будет true
- к задеплоенной базе также можно коннектиться через postgres-клиенты (beekeper, dbeaver, etc.), для получения адреса см. п.10
- все ваши изменения окажутся в задеплоенной версии вашего приложения только после пуша, поэтому если что-то поменяли у себя на компьютере, а в задеплоенной версии ничего не изменилось, скорее всего вы забыли запушить изменения
- если вы деплоите через Гитхаб, достаточно запушить изменения в Гитхаб, хероку сам заметит пуш и начнет повторный деплой. если деплоите через heroku-cli – связи с Гитхабом не будет, и пуш в Гитхаб не будет означать пуш на хероку (и наоборот)
- дополнительные переменные окружения для продакшна задаются в конфигурации приложения на хероку, .env файл не нужен, при этом пакет dotenv всё равно будет работать




const sequelize = require('sequelize');
const { User, Task } = require('./db/models');


async function test() {
  const allUsers = await User.findAll();
  // console.log(allUsers);
  // [ User { dataValues: { id: 1, nameUser: 'Вася', createdAt: null, updatedAt: null } } } ], => вся таблица

  const allUsers2 = await Task.findAll({attributes: ['user_id']});
  // console.log(allUsers2);
  // [ Task { dataValues: { user_id: 1 } } ], => значения колонки user_id со всей таблицы

  const allUsers3 = await Task.findAll({attributes: ['user_id'], where: { user_id: 1}});
  // console.log(allUsers3);
  // [ Task { dataValues: { user_id: 1 } } ], => значения колонки user_id, содержащие значения 1 в ячейках со всей таблицы
  
  const allUsers4 = await Task.findAll({attributes: ['body'], include: { model: User, where: { nameUser: 'Вася' }, attributes: ['nameUser'] }});
  console.log(allUsers4[0].dataValues.User.dataValues.nameUser); // Вася
    // [ Task { dataValues: { body: 'Ходить', User: User { dataValues: { nameUser: 'Вася' } } } } ], 
  // [ Task { dataValues: { body: 'Бежать', User: User { dataValues: { nameUser: 'Вася' } } } } ], 
  // => вытаскивает задачу, user_id которой соответствует в зависящей таблице id указанного юзера, а так же значение ячейки nameUser указанного юзера
  
}

test();


// Tasks
// id body user_id
// 1  Ходить     1
// 2  Бежать     1

// Users
// id nameUser 
// 1    Вася 
