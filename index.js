import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import router from './routes/index.js';

dotenv.config();

const PORT = 5000 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await db.authenticate();
        await db.sync();
        app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server has started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    };
};

start();