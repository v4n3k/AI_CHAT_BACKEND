import { db } from '../db.js';

class AiModelController {
	async getAiModels(_, res) {
		const modelsResult = await db.query('SELECT * FROM "aiModels"');
		const models = modelsResult.rows;

		res.json(models);
	}
}

export default new AiModelController();