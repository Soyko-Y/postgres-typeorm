import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import newsRouter from './routes/news';
import cors from 'cors';

const app: Application = express();
const corsOptions = {
  origin: 'http://localhost:8081',
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/news', newsRouter);

export default app;
