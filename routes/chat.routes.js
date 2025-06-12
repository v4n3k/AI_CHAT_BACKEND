import express from 'express';
import ChatController from '../controllers/chat.controller.js';
import { handleError } from '../utils/utils.js';

export const router = express.Router();

router.get('/chats/:userId', handleError(ChatController.getChatsByUserId));
router.get('/chat/:chatId', handleError(ChatController.getChatById));
router.post('/chats', handleError(ChatController.createChat));

