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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const sendMail = (email, name, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: config_1.default.EMAILUSER,
                pass: config_1.default.EMAILPASS,
            },
        });
        const mailOptions = {
            from: config_1.default.EMAILUSER,
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
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error('SendGrid Error:', error);
        throw new Error('Failed to send OTP email');
    }
});
exports.default = sendMail;
