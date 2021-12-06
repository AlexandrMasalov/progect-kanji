const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt')
// const tagsRouter = require('./routes/tags') //для роутов
const { session, sessionConfig } = require('./config/sessions');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));


// app.get('/', (req, res) => {
//   res.render('index');
// });
// app.use('/tags', tagsRouter); //ссылка на роуты

module.exports = app;
