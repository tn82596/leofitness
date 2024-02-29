import { Schema, model, Document } from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     ExerciseSession:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         muscleType:
 *           type: string
 *         sets:
 *           type: integer
 *           format: int32
 *         weight:
 *           type: number
 *           format: float
 *         restTime:
 *           type: integer
 *           format: int32
 *         intensity:
 *           type: string
 *           enum:
 *             - low
 *             - medium
 *             - high
 */

export interface IExerciseSession extends Document {
	name: string;
	description: string;
	icon: string;
	muscleType: string;
	sets: number;
	weight: number;
	restTime: number;
	intensity: string;
}

const ExerciseSessionSchema = new Schema<IExerciseSession>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String, required: true },
	muscleType: { type: String, lowercase: true, required: true },
	sets: { type: Number, required: true },
	weight: { type: Number, required: true },
	restTime: { type: Number, required: true },
	intensity: {
		type: String,
		lowercase: true,
		enum: ['low', 'medium', 'high'],
		required: true,
	},
});

const ExerciseSessionModel = model<IExerciseSession>('ExerciseSession', ExerciseSessionSchema);

export default ExerciseSessionModel;
