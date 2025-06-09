import { db } from '../db.js';

class MessageController {
	async getMessagesByChatId(req, res) {
		const { chatId } = req.params;

		if (!chatId) {
			return res.status(400).json({ error: 'Chat ID is required' });
		}

		const messagesResult = await db.query(
			'SELECT * FROM messages WHERE "chatId" = $1 ORDER BY id',
			[chatId]
		);
		const messages = messagesResult.rows;

		res.json(messages);
	}

	async createMessage(req, res) {
		const { chatId, from, content } = req.body;

		if (!chatId || !from || !content) {
			return res.status(400).json({ error: 'Chat ID, from, and content are required' });
		}

		const newMessageResult = await db.query(
			'INSERT INTO messages ("chatId", "from", content) VALUES ($1, $2, $3) RETURNING *',
			[chatId, from, content]
		);
		const newMessage = newMessageResult.rows[0];

		res.json(newMessage);
	}
}

export default new MessageController();
