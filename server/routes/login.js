const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    responses = require('../response/index'),
    resList = require('../const/response-list');
router.post('/',
    function (req, res, next) {
        passport.authenticate('login',
            (err, user, info) => {
                user.password = undefined;
                return responses.success(req, res, resList.success(null, info, user));
            }
        )(req, res, next);
    }
);

module.exports = router;