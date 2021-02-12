import { createConnection } from 'typeorm';
import app from './app';

createConnection().then(async connection => {
  const PORT = 8080;

  app.listen(PORT, () => {
    console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
  });
});
