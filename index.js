import express from 'express';
import { config } from 'dotenv';
config();

import cors from 'cors';
import route from './routes/index.route.js';
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Routes
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
