import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});


export const sendEmail = async (data: any, mailOptions: { to: string; subject: string; template: string; isAdmin?: boolean }) => {
  try {
    const templateSource = fs.readFileSync(path.join(__dirname, `../templates/${mailOptions.template}`), 'utf8');

    const template = handlebars.compile(templateSource);

    const html = template(data); 

    const options = {
      from: mailOptions.isAdmin ? data.email : 'raul.may@dinotransfers.com',
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: html,
    };

    console.log("from:", options.from); // Imprime el valor de from
    console.log("to:", options.to);
    const info = await transporter.sendMail(options);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};