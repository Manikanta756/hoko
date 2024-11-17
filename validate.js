
const jwt = require('jsonwebtoken');
const check = (req, res, next) => {
    const token = req.cookies.jwt; 
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, "vamsi", (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        next();
    });
};
const current= (req, res, next) => {
    const token = req.cookies.jwt; 
    if (!token) {
        res.locals.user = null; 
        return next();
    }

    jwt.verify(token, "vamsi", (err, decoded) => {
        if (err) {
            res.locals.user = null;
            return next();
        }
        res.locals.user = decoded; 
        next();
    });
};


module.exports = {check,current};