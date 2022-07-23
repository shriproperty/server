"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
/**
 * this function will check if the user is logged in or not
 * and send error if user is not logged in
 */
function requireLoggedIn(req, res, next) {
    const user = res.locals.user;
    if (!user)
        return res.sendStatus(http_status_codes_1.StatusCodes.FORBIDDEN);
    return next();
}
exports.default = requireLoggedIn;
