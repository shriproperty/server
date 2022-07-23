"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const user = process.env.EMAIL_ID;
const pass = process.env.EMAIL_PASSWORD;
/**
 * Send Email using nodemailer
 * @param {string} to Email id to send email
 * @param {string} subject Subject of email
 * @param {string} text content of email
 * @return sent message info
 */
function sendEmail(to, subject, text) {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: user,
            pass: pass,
        },
    });
    const mailOptions = {
        from: {
            name: 'Shri Property',
            address: user,
        },
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions);
}
exports.sendEmail = sendEmail;
