import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';

import { errorMiddleware } from './middlewares/erro.middleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(errorMiddleware);

export default app;
