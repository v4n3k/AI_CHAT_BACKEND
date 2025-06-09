import pkg from 'cookie-parser';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv-esm';
import express from 'express';
import helmet from 'helmet';
import { router as aiModelRouter } from './routes/ai_model.routes.js';
import { router as authRouter } from './routes/auth.routes.js';
import { router as chatRouter } from './routes/chat.routes.js';
import { router as messageRouter } from './routes/message.routes.js';
import { getDotEnvVar } from './utils/utils.js';

dotenvConfig();

const cookieParse = pkg;

const FRONTEND_URL = getDotEnvVar("FRONTEND_URL");
const LOCAL_FRONTEND_URL = getDotEnvVar("LOCAL_FRONTEND_URL");
const PORT = getDotEnvVar("BACKEND_PORT");
const IS_DEV = getDotEnvVar('NODE_ENV') === 'dev';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParse());
app.use(cors({
	origin: IS_DEV ? LOCAL_FRONTEND_URL : FRONTEND_URL,
	methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'Accept',
		'Origin',
		'X-Requested-With'
	],
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: 204
}));


app.use('/api', authRouter);
app.use('/api', chatRouter);
app.use('/api', messageRouter);
app.use('/api', aiModelRouter);

const start = (PORT) => {
	console.log(`Server is running on port ${PORT} in ${getDotEnvVar('NODE_ENV')} mode`);
};

app.listen(PORT, start(PORT)); 
