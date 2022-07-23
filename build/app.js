"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const child_process_1 = require("child_process");
const node_cron_1 = __importDefault(require("node-cron"));
const compression_1 = __importDefault(require("compression"));
const fs_1 = require("fs");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const deserializeUser_middleware_1 = __importDefault(require("./middlewares/deserializeUser.middleware"));
(0, dotenv_1.config)();
const apiAuth_middleware_1 = __importDefault(require("./middlewares/apiAuth.middleware"));
const tempUser_routes_1 = __importDefault(require("./routes/tempUser.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const otp_routes_1 = __importDefault(require("./routes/otp.routes"));
const listing_routes_1 = __importDefault(require("./routes/listing.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const logger_helper_1 = __importDefault(require("./helpers/logger.helper"));
const s3_helper_1 = require("./helpers/s3.helper");
const app = (0, express_1.default)();
const DB_URI = process.env.DB_URI;
/* ------------------------------- ANCHOR middlewares ------------------------------ */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)({
    level: 9,
}));
app.use('/api', apiAuth_middleware_1.default);
app.use('/api', deserializeUser_middleware_1.default);
/* --------------------------------- ANCHOR routes --------------------------------- */
app.use('/api', tempUser_routes_1.default);
app.use('/api', contact_routes_1.default);
app.use('/api', property_routes_1.default);
app.use('/api', otp_routes_1.default);
app.use('/api', listing_routes_1.default);
app.use('/api', auth_routes_1.default);
app.use('/api', user_routes_1.default);
/* ---------------------------------- ANCHOR data base backup ---------------------------------- */
const backupDB = () => {
    const child = (0, child_process_1.spawn)('mongodump', [
        '--db=shriproperty',
        '--archive=db.gzip',
        '--gzip',
    ]);
    child.stdout.on('data', data => logger_helper_1.default.info(data));
    // from console
    child.stderr.on('data', data => logger_helper_1.default.info(Buffer.from(data).toString()));
    // from node js code
    child.on('error', err => logger_helper_1.default.error(err));
    child.on('exit', (code, signal) => __awaiter(void 0, void 0, void 0, function* () {
        if (code)
            logger_helper_1.default.info(`Process exit with code: ${code}`);
        else if (signal)
            logger_helper_1.default.error(`Process killed with signal ${signal}`);
        else
            logger_helper_1.default.info('Backup is successful');
        yield (0, s3_helper_1.uploadFileToS3)({
            path: path_1.default.basename('db.gzip'),
            filename: 'db.gzip',
        });
        (0, fs_1.unlink)(path_1.default.basename('db.gzip'), () => logger_helper_1.default.info('deleted .gzip file'));
    }));
};
node_cron_1.default.schedule('0 0 * * *', () => backupDB());
/* --------------------------------- ANCHOR server --------------------------------- */
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve('build', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve('build', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 8000;
mongoose_1.default.connect(DB_URI, () => {
    app.listen(PORT);
});
exports.default = app;
