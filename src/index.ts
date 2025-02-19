import 'dotenv/config';
import express from 'express'
import cors from 'cors';
import { v1Router } from './v1/routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())





app.use('/api/v1/', v1Router)



app.listen(port, (error) => {
    console.log(`⚡️ service is live on http://localhost:${port}`)
})