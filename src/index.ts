// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import workoutSessionRouter from './routes/workoutSession';
import userRouter from './routes/user';
import scheduleRouter from './routes/schedule';
import workoutPlanRouter from './routes/workoutPlan';
import swaggerDocs from './utils/swagger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	// res.send('Server up (updated for testing w/ EB)!');
	// For testing
	res.send(`Server up! With MongoDB URI: "${process.env.MONGODB_URI || 'none'}"`);
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
	swaggerDocs(app);
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
app.use('/api/', userRouter);
app.use('/api/', workoutPlanRouter);
app.use('/api/', scheduleRouter);

// node build/index.js
