"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_helper_1 = require("../helpers/jwt.helper");
/**
 * This function will be called before every route
 * and will deserialize the user from the cookie token
 * and attach it to the req.locals
 */
function deserializeUser(req, res, next) {
    let decoded;
    if (req.cookies.token) {
        decoded = (0, jwt_helper_1.verifyJWT)(req.cookies.token);
    }
    if (!decoded)
        return next();
    res.locals.user = decoded.id;
    return next();
}
exports.default = deserializeUser;
