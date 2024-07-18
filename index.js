const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
