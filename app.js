/*
 * YABE - Yet Another Blog Engine
 */
"use strict";

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
/* Express Middlewares */
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
/* Passport Strategies */
const BasicStrategy = require("passport-http").BasicStrategy;
/* our own modules */
const User = require("./models/user");

/* create our app */
const app = express();

/* configuration */
app.locals.name = require("./package.json").name;
app.locals.config = require(`./config/${process.env.NODE_ENV}`);

/* mongoose & MongoDB stuff */
mongoose.Promise = global.Promise; // Use native promises
mongoose.set('debug', (process.env.NODE_ENV === 'development'));

/* mongoose connection */
app.locals.connect = function() {
    const dbname = app.locals.config.mongodb.database;
    console.log(`NODE_ENV=${process.env.NODE_ENV}, connecting to ${dbname}`);
    return mongoose.connect(dbname, { useMongoClient: true });
};

/* Express Middlewares setup */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production')
    app.use(morgan('combined'));
app.use(passport.initialize());

/* authentication: Basic Auth with Passport */
passport.use(new BasicStrategy((username, password, done) => {
    User.authenticate(username, password).then(user => {
        return done( /* no error */ null, user);
    }).catch(done);
}));

//This is CORS-enabled for all origins
app.use(cors());

const port = process.env.PORT || app.locals.config.server.port;

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/* our routers */
app.use("/api/users", require("./routers/user"));
app.use("/api/posts", require("./routers/post"));

// expose our app to require()
module.exports = app;