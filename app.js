var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var blogRouter = require('./routes/blog');
var tutorialRouter = require('./routes/tutorial');
//var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Permite que o Express entenda os dados enviados pelos formulários (POST)
app.use(express.urlencoded({ extended: true }));

// Configuração da Sessão (obrigatório para o login funcionar)
app.use(session({
  secret: 'sua-chave-secreta',
  resave: false,
  saveUninitialized: true
}));

app.use('/', tutorialRouter);       
app.use('/login', loginRouter); 
app.get('/', (req, res) => res.redirect('/blog'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
