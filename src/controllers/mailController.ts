import { Request, Response } from "express";
import { sendEmail } from "../utils/mail";

export const sendMailController = async (req: Request, res: Response) =>
{
    try
    {
        const { email, subject, nombre, mensaje, ...formData } = req.body;

        if (!email || !subject || !nombre || !mensaje) {
            res.status(400).json({ error: 'Faltan datos obligatorios' }); 
        }

        // Correo al usuario
        await sendEmail({formData, nombre:nombre}, { 
            to: email,
            subject: subject,
            template: 'templateContactClient.html',
            isAdmin: false, 
          });
    
        // Correo al administrador
        await sendEmail({formData,nombre:nombre, mensaje:mensaje, email: email, subject:subject }, {  
            to: 'raul.may@dinotransfers.com', 
            subject: 'Contacto May Cloud '+ subject,
            template: 'templateContactAdmin.html',
            isAdmin: true, 
          });
      
        res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
        console.log("formData:", formData);
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ error: 'Error al enviar el correo electrónico' });
      }
};