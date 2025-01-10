import nodemailer from 'nodemailer';
import config from '../config/config';

const sendMail = async (email: string, name: string, otp: string) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAILUSER,
                pass: config.EMAILPASS,
            },
        });

        const mailOptions = {
            from: config.EMAILUSER,
            to: email,
            subject: 'Your OTP Code',
            html: `
              <p>Hello, ${name}</p>
              <p>Thank you for choosing to verify your account with us! Your One-Time Password (OTP) for secure access is:</p>
              <h2 style="color: #4CAF50;">${otp}</h2>
              <p>Please enter this code to complete your signin process. If you didn't request this code, you can safely ignore this message.</p>
              <p>If you need assistance, feel free to reach out to us.</p>
              <br/>
              <p>Best regards,</p>
              <p>The Note MakingTeam</p>
            `,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('SendGrid Error:', error);
        throw new Error('Failed to send OTP email');
    }
}
export default sendMail