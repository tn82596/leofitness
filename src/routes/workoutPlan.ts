import express, { Request, Response, NextFunction } from 'express';
import WorkoutPlan from '../models/workoutPlan';
import ExercisePlan from '../models/exercisePlan';
import User from '../models/user';

const router = express.Router();

// Get all workout plans belonging to a certain user
router.get('/workout_plan/:user_id', async (req: Request, res: Response, next: NextFunction) => {
	/**
	 * @openapi
	 * /api/workout_plan/{user_id}:
	 *   get:
	 *     tags:
	 *       - Workout Plan
	 *     summary: Get workout plans of a user
	 *     description: Retrieve workout plans associated with the specified user ID.
	 *     parameters:
	 *       - in: path
	 *         name: user_id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user whose workout plans are to be retrieved.
	 *     responses:
	 *       '200':
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 status:
	 *                   type: string
	 *                   example: success
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/WorkoutPlan'
	 *       '404':
	 *         description: User not found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: User not found
	 *       '500':
	 *         description: Internal Server Error
	 */
	try {
		const userId = req.params.user_id;
		const user = await User.findById(userId).populate('workoutPlans');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({ status: 'success', data: user.workoutPlans });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// Get all workout plans belonging to a user associated with a certain category
router.get(
	'/workout_plan/:user_id/category/:category',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.params.user_id;
			const category = req.params.category;
			const user = await User.findById(userId).populate({
				path: 'workoutPlans',
				match: { category: category },
			});

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			res.status(200).json({ status: 'success', data: user.workoutPlans });
		} catch (err) {
			console.log(err);
			next(err);
		}
	},
);

// Get a specific workout plan based on workout plan ID
router.get(
	'/workout_plan/:workout_plan_id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const workoutPlanId = req.params.workout_plan_id;
			const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

			if (!workoutPlan) {
				return res.status(404).json({ message: 'Workout plan not found' });
			}
			res.status(200).json({ status: 'success', data: workoutPlan });
		} catch (err) {
			console.log(err);
			next(err);
		}
	},
);

// Create a new workout plan and update the user's workoutPlans array
router.post('/workout_plan/:user_id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const exercises = req.body.exercises;
		const exerciseIds = [];

		for (let i = 0; i < exercises.length; i++) {
			const existingExercise = await ExercisePlan.findOne({
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
				exerciseIds.push(existingExercise._id);
			} else {
				const newExercisePlan = new ExercisePlan(exercises[i]);
				const savedExercisePlan = await newExercisePlan.save();
				exerciseIds.push(savedExercisePlan._id);
			}
		}

		const insertObj = {
			name: req.body.name,
			category: req.body.category,
			exercises: exerciseIds,
		};

		const newWorkoutPlan = new WorkoutPlan(insertObj);
		const savedWorkoutPlan = await newWorkoutPlan.save();

		// add new workoutPlan to user's workoutPlan array
		const user = await User.findById(req.params.user_id);
		if (!user) {
			return res.status(404).json({ status: 'error', message: 'User not found' });
		}
		user.workoutPlans.push(savedWorkoutPlan._id);
		await user.save();

		res.status(201).json({ status: 'success', data: savedWorkoutPlan });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// UPDATE
router.put(
	'/workout_plan/:workout_plan_id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const workoutPlanId = req.params.workout_plan_id;
			const updateObj = req.body;

			const exercises = req.body.exercises;
			const exerciseIds = [];

			for (let i = 0; i < exercises.length; i++) {
				const existingExercise = await ExercisePlan.findOne({
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
					exerciseIds.push(existingExercise._id);
				} else {
					const newExercisePlan = new ExercisePlan(exercises[i]);
					const savedExercisePlan = await newExercisePlan.save();
					exerciseIds.push(savedExercisePlan._id);
				}
			}

			updateObj.exercises = exerciseIds;
			const updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(workoutPlanId, updateObj, {
				new: true,
			});

			if (!updatedWorkoutPlan) {
				return res.status(404).json({ message: 'Workout plan not found' });
			}
			res
				.status(200)
				.json({ message: 'Workout plan updated successfully', data: updatedWorkoutPlan });
		} catch (err) {
			console.log(err);
			next(err);
		}
	},
);

// DELETE
router.delete(
	'/workout_plan/:workout_plan_id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const workoutPlanId = req.params.workout_plan_id;
			const deletedWorkoutPlan = await WorkoutPlan.findByIdAndDelete(workoutPlanId);

			if (!deletedWorkoutPlan) {
				return res.status(404).json({ message: 'Workout plan not found' });
			}
			res.status(200).send({ status: 'success' });
		} catch (err) {
			console.log(err);
			next(err);
		}
	},
);

export default router;
