import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import newsRouter from './routes/news';
import cors from 'cors';

createConnection().then(async connection => {
  const app: Application = express();
  const corsOptions = {
    origin: 'http://localhost:8081',
  };
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/news', newsRouter);

  const PORT = 8080;

  app.listen(PORT, () => {
    console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
  });
});
