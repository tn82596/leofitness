import { Schema, model, Document, Types } from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     ExerciseSet:
 *       type: object
 *       required:
 *        - setNum
 *        - weight
 *        - duration
 *        - restTime
 *       properties:
 *         setNum:
 *           type: integer
 *           format: int32
 *         weight:
 *           type: number
 *           format: float
 *         duration:
 *           type: integer
 *           format: int32
 *         restTime:
 *           type: integer
 *           format: int32
 */

export interface IExerciseSet extends Document {
	setNum: number;
	weight: number;
	duration: number;
	restTime: number;
}

const ExerciseSetSchema = new Schema<IExerciseSet>({
	setNum: { type: Number, required: true },
	weight: { type: Number, required: true },
	duration: { type: Number, required: true },
	restTime: { type: Number },
});

const ExerciseSetModel = model<IExerciseSet>('ExerciseSet', ExerciseSetSchema);

export default ExerciseSetModel;
