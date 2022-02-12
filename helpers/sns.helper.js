import AWS from 'aws-sdk';
import { config } from 'dotenv';

config();

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

/**
 * Send Sms to mobile number using aws SNS
 * @param {string} message message to be sent
 * @param {string} phoneNumber phone number to send message
 * @return {Promise} Response from SNS
 */
export const sendSms = (message, phoneNumber) => {
	const params = {
		Message: message,
		PhoneNumber: phoneNumber,
	};

	return SNS.publish(params).promise();
};
