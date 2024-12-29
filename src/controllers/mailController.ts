import { Request, Response } from "express";
import { sendEmail } from "../utils/mail";
import fs from 'fs'; 
import path from 'path';

export const sendMailController = async (req: Request, res: Response) =>
{
    try
    {
        const { to, subject } = req.body;

        if (!to || !subject) {
            res.status(400).json({ error: 'Faltan datos obligatorios' }); 
        }

        const mjmlTemplate = fs.readFileSync(path.join(__dirname, '../templates/templateTests.mjml'), 'utf8');
      
          await sendEmail(to, subject, mjmlTemplate);
      
          res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ error: 'Error al enviar el correo electrónico' });
      }
};