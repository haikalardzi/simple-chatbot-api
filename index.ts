import express from 'express';
import router from './routes/api.ts';

const app = express();

const port: number = parseInt(process.env.PORT || '8000');
const host: string = process.env.HOST || 'localhost';

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello World",
    success: true,
  });
})
app.use('/api', router);

app.listen(port, host, () => {
  console.log(`Server: http://${host}:${port}`);
});