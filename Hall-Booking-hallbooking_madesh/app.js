var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var hallavailabilityRouter = require('./routes/hallavailability');
var hallbookingRouter = require('./routes/hallbooking');
var hallbookingdetailsRouter = require('./routes/hallbookingdetails');
var hallcancellationRouter = require('./routes/hallcancellation');
var paymentdetailsRouter = require('./routes/paymentdetails');
var customerdetailsRouter = require('./routes/customerdetails');
var logoutRouter = require('./routes/logout');
var signupRouter = require('./routes/signup');
var deletehallbookingRouter = require('./routes/deletehallbooking');

var app = express();

var session = require('express-session');
app.use(session({
  key: 'user_sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 36000000 }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/home', homeRouter);
// app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/hallavailability', hallavailabilityRouter);
app.use('/hallbooking', hallbookingRouter);
app.use('/hallbookingdetails', hallbookingdetailsRouter);
app.use('/hallcancellation', hallcancellationRouter);
app.use('/paymentdetails', paymentdetailsRouter);
app.use('/customerdetails', customerdetailsRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/deletehallbooking', deletehallbookingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const port = 8000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/login`)
});

module.exports = app;