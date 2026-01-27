import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
export class Mailer {
    constructor() {
    }

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    async MailAnOrder(email: string, name: string, phone: string, subject: string, message: string) {

        const orderDetailsText = `

            Name: ${name}
            Phone: ${phone}
            Subject: ${subject}
            message: ${message}`;

        const mailOptions = {
            from: 'akashganeshaner@gmail.com',
            to: [email, 'akashganeshaner@gmail.com'],
            subject: 'Thanks for reaching us, Jeevanax',
            text: orderDetailsText
        };

        this.transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.error(error);
            }
        });
    }
}

export default Mailer;
