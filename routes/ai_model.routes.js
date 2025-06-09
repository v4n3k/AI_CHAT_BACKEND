import express from 'express';
import AiModelController from '../controllers/ai_model.controller.js';
import { handleError } from '../utils/utils.js';

export const router = express.Router();

router.get('/ai_models', handleError(AiModelController.getAiModels));

