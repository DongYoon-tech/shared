const express = require('express');

const ExpressError = require('./helpers/ExpressError');

const usersRoutes = require('./routes/users');
const hobbiesRoutes = require('./routes/hobbies');
const authRoutes = require('./routes/auth');

const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/hobbies', hobbiesRoutes);
app.use('/users', usersRoutes);
app.use('/', authRoutes);

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);

    return next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);

    return res.json({
        status: err.status,
        message: err.message
    });
});


module.exports = app;