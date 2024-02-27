// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import workoutSessionRouter from './routes/workoutSession';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.send('Server up!');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

const uri = process.env.MONGODB_URI || '';

// connect to mongodb database
mongoose
	.connect(uri)
	.then(() => {
		console.log('Successfully connected to MongoDB!');
	})
	.catch((err: mongoose.Error) => {
		mongoose.disconnect();
		console.log('Failed to connect to MongoDB');
		console.log(`Error: ${err}`);
	});

app.use('/api/', workoutSessionRouter);
