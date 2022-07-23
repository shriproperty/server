"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const SNS = new aws_sdk_1.default.SNS({ apiVersion: '2010-03-31' });
/**
 * Send Sms to mobile number using aws SNS
 * @param {string} message message to be sent
 * @param {string} phoneNumber phone number to send message
 * @return {Promise} Response from SNS
 */
const sendSms = (message, phoneNumber) => {
    const params = {
        Message: message,
        PhoneNumber: phoneNumber,
    };
    return SNS.publish(params).promise();
};
exports.sendSms = sendSms;
