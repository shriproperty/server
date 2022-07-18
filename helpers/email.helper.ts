import nodemailer, { SentMessageInfo } from 'nodemailer';
import { config } from 'dotenv';

config();

const user = process.env.EMAIL_ID as string;
const pass = process.env.EMAIL_PASSWORD as string;

/**
 * Send Email using nodemailer
 * @param {string} to Email id to send email
 * @param {string} subject Subject of email
 * @param {string} text content of email
 * @return sent message info
 */
export function sendEmail(
	to: string,
	subject: string,
	text: string
): Promise<SentMessageInfo> {
	const transporter = nodemailer.createTransport({
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
