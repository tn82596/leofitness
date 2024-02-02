import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkoutSession extends Document {
	name: string;
	exercises: Types.ObjectId[];
}

const workoutSessionSchema = new Schema<IWorkoutSession>(
	{
		name: {type: String, required: true},
		exercises: [{ type: Types.ObjectId, ref: 'ExerciseSession' }], // Assuming 'Exercise' is the referenced model
	},
	{ timestamps: true },
);

const WorkoutSessionModel = model<IWorkoutSession>('WorkoutSession', workoutSessionSchema);

export default WorkoutSessionModel;
