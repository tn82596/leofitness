import { Schema, model, Document } from 'mongoose';

export interface IExerciseSession extends Document {
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
	name: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String, required: true },
	muscle_type: { type: String, lowercase: true, required: true },
	sets: { type: Number, required: true },
	weight: { type: Number, required: true },
	rest_time: { type: Number, required: true },
	intensity: {
		type: String,
		lowercase: true,
		enum: ['low', 'medium', 'high'],
		required: true,
	},
});

const ExerciseSessionModel = model<IExerciseSession>('ExerciseSession', ExerciseSessionSchema);

export default ExerciseSessionModel;
