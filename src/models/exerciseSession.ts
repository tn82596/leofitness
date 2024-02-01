import { Schema, model, Document } from 'mongoose';

interface IExerciseSession extends Document {
	name: string;
	description: string;
	icon: string;
	muscle_type: string;
	sets: number;
	weight: number;
	rest_time: number;
	intensity: string;
}

const ExerciseSessionSchema = new Schema<IExerciseSession>({
	name: String,
	description: String,
	icon: String,
	muscle_type: {
		type: String,
		lowercase: true, // corrected from lower_case to lowercase
	},
	sets: Number,
	weight: Number,
	rest_time: Number,
	intensity: {
		type: String,
		lowercase: true, // corrected from lower_case to lowercase
		enum: ['low', 'medium', 'high'],
	},
});

const ExerciseSessionModel = model<IExerciseSession>('ExerciseSession', ExerciseSessionSchema);

export default ExerciseSessionModel;
