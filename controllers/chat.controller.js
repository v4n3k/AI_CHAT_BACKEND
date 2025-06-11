import { db } from '../db.js';

class ChatController {
	async getChatsByUserId(req, res) {
		const { userId } = req.params;

		if (!userId) {
			return res.status(400).json({ error: 'User ID is required' });
		}

		const chatsResult = await db.query(
			`
      SELECT
        c.id,
        c."userId",
        c."modelName",
        lm.id AS "lastMessageId",
        lm.content AS "lastMessageContent",
        lm."from" AS "lastMessageFrom"
      FROM
        chats c
      LEFT JOIN LATERAL (
        SELECT
          m.id,
          m.content,
          m."from"
        FROM
          messages m
        WHERE
          m."chatId" = c.id
        ORDER BY
          m.id DESC
        LIMIT 1
      ) AS lm ON TRUE
    	WHERE
        c."userId" = $1
			ORDER BY
    		lm.id DESC NULLS LAST;
      `,
			[userId]
		);

		const chats = chatsResult.rows.map(chat => ({
			id: chat.id,
			userId: chat.userId,
			modelName: chat.modelName,
			lastMessage: chat.lastMessageContent ? {
				id: chat.lastMessageId,
				content: chat.lastMessageContent,
				from: chat.lastMessageFrom
			} : null
		}));

		res.json(chats);
	}

	async createChat(req, res) {
		const { userId, modelName } = req.body;

		if (!userId || !modelName) {
			return res.status(400).json({ error: 'User ID and model name are required' });
		}

		const newChatResult = await db.query(
			'INSERT INTO chats ("userId", "modelName") VALUES ($1, $2) RETURNING *',
			[userId, modelName]
		);
		const newChat = newChatResult.rows[0];

		res.json(newChat);
	}
}

export default new ChatController();