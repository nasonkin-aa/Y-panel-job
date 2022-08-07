import express from 'express';
import router from './router/index';
import cors from 'cors';
import { openDB } from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

app.use(express.static('./public'));
app.use(router);
app.use(cors());

openDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));

