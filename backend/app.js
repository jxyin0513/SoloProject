const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { ValidationError } = require('sequelize');
const multer = require('multer')
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
app.use(
    helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
    })
);
app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );
app.use(routes);

// app.use((err, _req, _res, next)=>{
//   const err = Error('Bad request.');
//   err.status = 400;
//   err.title = 'Bad request.';
//   if (err instanceof multer.MulterError) {
//     if(err.code === "LIMIT_FILE_SIZE"){
//       err.errors = ["Please try smaller file size"]
//     }else if(err.code === "LIMIT_UNEXPECTED_FILE"){
//       err.errors = ["Please submit appropriate file type"]
//     }
//   }
//   next(err)
// })

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});


module.exports = app;
