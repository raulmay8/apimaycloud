import express from 'express';
import { sendMailController } from '../controllers/mailController';

const router = express.Router();

router.post('/', sendMailController);

export { router as mailRoutes };