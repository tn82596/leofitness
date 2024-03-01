import express, { Request, Response, NextFunction } from 'express';

import WorkoutSessionModel from '../models/workoutSession';
import ExerciseSessionModel from '../models/exerciseSession';

const router = express.Router();
const dummy_exercise = {
	name: 'bench press',
	description: 'sit on bench and push heavy circle',
	icon: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fworld-us-canada-37493165&psig=AOvVaw2qm3bu5JC-rWltqZWtXRiF&ust=1706904020436000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKD38JD3ioQDFQAAAAAdAAAAABAD',
	muscleType: 'chest',
	sets: 2,
	weight: 225,
	restTime: 100,
	intensity: 'high',
};
const dummy_workout = {
	name: 'workout1',
	exercises: [dummy_exercise, dummy_exercise],
};

// GET
router.get('/workout_session/:user_id', (req: Request, res: Response) => {
	/**
	 * @openapi
	 * /api/workout_session/{user_id}:
	 *   get:
	 *     tags:
	 *       - Workout Session
	 *     summary: Returns all the workout sessions of a user
	 *     description: Returns all workout sessions associated with the specified user ID.
	 *     parameters:
	 *       - in: path
	 *         name: user_id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user whose workout sessions are to be retrieved.
	 *     responses:
	 *       '200':
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/WorkoutSession'
	 *       '404':
	 *         description: User not found
	 *       '500':
	 *         description: Internal Server Error
	 */
	// TODO: get workout session using user id
	res.status(200).send([dummy_workout, dummy_workout]);
});

// CREATE
router.post('/workout_session/', async (req: Request, res: Response, next: NextFunction) => {
	/**
	 * @openapi
	 * /api/workout_session:
	 *   post:
	 *     tags:
	 *       - Workout Session
	 *     summary: Create a new workout session which contains a list of exercise objects
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/WorkoutSession'
	 *     responses:
	 *       '201':
	 *         description: Created
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 status:
	 *                   type: string
	 *                 data:
	 *                   $ref: '#/components/schemas/WorkoutSession'
	 *       '400':
	 *         description: Bad Request
	 *       '500':
	 *         description: Internal Server Error
	 */

	try {
		const exercises = req.body.exercises;
		const exerciseIds = [];

		// Loop through exercises
		for (let i = 0; i < exercises.length; i++) {
			const existingExercise = await ExerciseSessionModel.findOne({
				name: exercises[i].name,
				description: exercises[i].description,
				icon: exercises[i].icon,
				muscleType: exercises[i].muscleType,
				sets: exercises[i].sets,
				weight: exercises[i].weight,
				restTime: exercises[i].restTime,
				intensity: exercises[i].intensity,
			});
			console.log(existingExercise);
			if (existingExercise) {
				// If exercise already exists, push its ID to exerciseIds array
				exerciseIds.push(existingExercise._id);
			} else {
				// If exercise doesn't exist, create a new one
				const newExercise = new ExerciseSessionModel(exercises[i]);
				const exercise = await newExercise.save();
				exerciseIds.push(exercise._id);
			}
		}

		const insertObj = {
			name: req.body.name,
			exercises: exerciseIds,
		};

		// Create and save new workout session
		const newSession = new WorkoutSessionModel(insertObj);
		const session = await newSession.save();

		res.status(201).json({ status: 'success', data: session });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// UPDATE
router.put(
	'/workout_session/:workout_session_id',
	async (req: Request, res: Response, next: NextFunction) => {
		/**
		 * @openapi
		 * /workout_session/{workout_session_id}:
		 *   put:
		 *     tags:
		 *       - Workout Session
		 *     summary: Update a workout session
		 *     description: Update a workout session by providing the workout session ID and the fields to update.
		 *     parameters:
		 *       - in: path
		 *         name: workout_session_id
		 *         required: true
		 *         schema:
		 *           type: string
		 *         description: The ID of the workout session to update.
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               name:
		 *                 type: string
		 *               exercises:
		 *                 type: array
		 *                 items:
		 *                   $ref: '#/components/schemas/ExerciseSession'
		 *     responses:
		 *       '200':
		 *         description: OK
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               properties:
		 *                 status:
		 *                   type: string
		 *                 data:
		 *                   $ref: '#/components/schemas/WorkoutSession'
		 *       '400':
		 *         description: Bad Request
		 *       '404':
		 *         description: Workout session not found
		 *       '500':
		 *         description: Internal Server Error
		 */
		try {
			const workoutSessionId = req.params.workout_session_id;
			const updateObj = req.body; // Assuming req.body contains the fields to update

			const exercises = req.body.exercises;
			const exerciseIds = [];

			// Loop through exercises
			for (let i = 0; i < exercises.length; i++) {
				const existingExercise = await ExerciseSessionModel.findOne({
					name: exercises[i].name,
					description: exercises[i].description,
					icon: exercises[i].icon,
					muscleType: exercises[i].muscleType,
					sets: exercises[i].sets,
					weight: exercises[i].weight,
					restTime: exercises[i].restTime,
					intensity: exercises[i].intensity,
				});

				if (existingExercise) {
					// If exercise already exists, push its ID to exerciseIds array
					exerciseIds.push(existingExercise._id);
				} else {
					// If exercise doesn't exist, create a new one
					const newExercise = new ExerciseSessionModel(exercises[i]);
					const exercise = await newExercise.save();
					exerciseIds.push(exercise._id);
				}
			}

			updateObj.exercises = exerciseIds;
			console.log(workoutSessionId);
			// Use { new: true } to return the modified document rather than the original
			const updatedSession = await WorkoutSessionModel.findOneAndUpdate(
				{ _id: workoutSessionId },
				updateObj,
				{ new: true },
			);
			if (updatedSession) res.status(200).json({ status: 'success', data: updatedSession });
			else res.status(400).json({ status: 'error', message: 'workout session not found' });
		} catch (err) {
			console.log(err);
			next(err);
		}
	},
);

// DELETE
router.delete('/workout_session/:workout_session_id', async (req: Request, res: Response) => {
	/**
	 * @openapi
	 * /workout_session/{workout_session_id}:
	 *   delete:
	 *     tags:
	 *       - Workout Session
	 *     summary: Delete a workout session
	 *     description: Delete a workout session by providing the workout session ID.
	 *     parameters:
	 *       - in: path
	 *         name: workout_session_id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the workout session to delete.
	 *     responses:
	 *       '200':
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 status:
	 *                   type: string
	 *                 data:
	 *                   $ref: '#/components/schemas/WorkoutSession'
	 *       '400':
	 *         description: Bad Request
	 *       '404':
	 *         description: Workout session not found
	 *       '500':
	 *         description: Internal Server Error
	 */

	try {
		const workoutSessionId = req.params.workout_session_id;
		const deletedSession = await WorkoutSessionModel.findOneAndDelete({ _id: workoutSessionId });

		if (deletedSession) res.status(200).send({ status: 'success', data: dummy_workout });
		else res.status(400).send({ status: 'error', message: 'workout session not found' });
	} catch (err) {
		console.log(`error: ${err}`);
	}
});

export default router;
