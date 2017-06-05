var jwt = require('jsonwebtoken');
var config = require('../config');
module.exports = function (req, res, next) {
    //need to by pass auth verification for OTP related calls
    console.log("Middleware called");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.ACCESS_TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(401).json({message:err.message});
            } else {
                req.userInfo = decoded;
                next();
            }
        });
    } else {

        return res.status(401).json({
            message: 'Unauthorized access'
        });
    }
}