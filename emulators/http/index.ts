import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.send('Some payload');
});

app.listen(8000, () => {
  console.log('HTTP emulator has started');
});