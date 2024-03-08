import { Schema, model, Document, Types } from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     ExerciseSession:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - icon
 *         - muscleType
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         muscleType:
 *           type: string
 *         category:
 *           type: string
 *         sets:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseSet'
 *           uniqueItems: true
 */

export interface IExerciseSession extends Document {
	name: string;
	description: string;
	icon: string;
	muscleType: string;
	category: string; // Updated property
	sets: Types.ObjectId[]; // Updated type
}

const ExerciseSessionSchema = new Schema<IExerciseSession>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String, required: true },
	muscleType: { type: String, lowercase: true, required: true },
	category: { type: String, required: true }, // Updated property
	sets: [{ type: Types.ObjectId, ref: 'ExerciseSet' }],
});

const ExerciseSessionModel = model<IExerciseSession>('ExerciseSession', ExerciseSessionSchema);

export default ExerciseSessionModel;
