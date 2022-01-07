//Google Strategy
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

let store

const passport = require('passport');
const { OAuth2Strategy } = require('passport-google-oauth');
const session = require('express-session');
const MongoStore = require('connect-mongo');

exports.setup = function (app) {
    store = MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/',
        dbName: 'shopping'
    });
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store: store
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new OAuth2Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email']
    },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ));
}

exports.passport = passport;
exports.store = store;