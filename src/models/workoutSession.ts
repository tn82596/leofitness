import { Schema, model, Document, Types } from 'mongoose';

interface IWorkoutSession extends Document {
	name: string;
	exercises: Types.ObjectId[];
}

const workoutSessionSchema = new Schema<IWorkoutSession>(
	{
		name: String,
		exercises: [{ type: Types.ObjectId, ref: 'ExerciseSession' }], // Assuming 'Exercise' is the referenced model
	},
	{ timestamps: true },
);

const WorkoutSessionModel = model<IWorkoutSession>('WorkoutSession', workoutSessionSchema);

export default WorkoutSessionModel;
