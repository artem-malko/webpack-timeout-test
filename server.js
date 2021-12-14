const express = require('express');
const path = require('path');
const app = express();

// @JUST_FOR_TEST JUST FOR TEST
app.use((req, res, next) => {
  if (req.url.includes('test')) {
    res.status(404).send();
  } else {
    next();
  }
});

app.use('/dist/', express.static(path.resolve(process.cwd(), 'dist')));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
