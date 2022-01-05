module.exports = (function () {
    const express = require('express');
    const router = express.Router();
    const { passport } = require('../passport');
    const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth');

    router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }), async (req, res) => {
        console.log(await req.user);
        res.redirect('/');
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    router.get('/getUser', checkAuthenticated, (req, res) => {
        if (req.user) {
            res.json(req.user);
        } else {
            res.json({});
        }
    });

    return router;
})();

