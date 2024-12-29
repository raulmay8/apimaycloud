import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mjml2html from 'mjml';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});


export const sendEmail = async (to: string, subject: string, mjmlTemplate: string) => { 
  try {

    const { html } = mjml2html(mjmlTemplate); 

    const mailOptions = {
      from: 'raul.may@dinotransfers.com',
      to,
      subject,
      html,
    };

    // Envía el correo
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};
