module.exports = (function () {
    const express = require('express');
    const router = express.Router();
    const { passport } = require('../passport');
    const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth');
    const listDB = require('../db/listDB');

    router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }), async (req, res) => {
        if(!await req.user.emails[0].value.includes('markus.simonsen@gmail.com')) {
            console.log('Not allowed');
            req.logout();
        }
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

    // Get list of items
    router.get('/getList/:list', checkAuthenticated, async (req, res) => {
        const list = req.params.list;
        const items = await listDB.getListItems(list);
        res.json(items);
    });

    return router;
})();

