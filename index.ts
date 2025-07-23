import express from 'express';
import router from './routes/api.ts';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { GetChat, MakeSession, NextQuestionResponse, SelectOptionError } from './docs/swagger.ts';

const app = express();

const port: number = parseInt(process.env.PORT || '8000');
const host: string = process.env.HOST || 'localhost';

const swagger = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chatbot API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        MakeSession: MakeSession,
        GetChat: GetChat,
        NextQuestionResponse: NextQuestionResponse,
        SelectOptionError: SelectOptionError
      }
    }
  },
  apis: ["./routes/api.ts"],
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger));

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