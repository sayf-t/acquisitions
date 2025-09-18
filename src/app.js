import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello from Acquisitions!');
});

console.log('hello from example branch!');
export default app;
