import express from 'express';
import MessageController from '../controllers/message.controller.js';
import { handleError } from '../utils/utils.js';

export const router = express.Router();

router.get('/messages/:chatId', handleError(MessageController.getMessagesByChatId));
router.post('/messages', handleError(MessageController.createMessage));
