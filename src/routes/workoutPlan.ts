import express, { Request, Response, NextFunction } from 'express';
import WorkoutPlanModel from '../models/workoutSession';
import ExercisePlanModel from '../models/exerciseSession';
import User from '../models/user';

const router = express.Router();

const dummy_data = {
	name: 'bench press',
	description: 'sit on bench and push heavy circle',
	icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fworld-us-canada-37493165&psig=AOvVaw2qm3bu5JC-rWltqZWtXRiF&ust=1706904020436000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKD38JD3ioQDFQAAAAAdAAAAABAD",
	muscle_type: "chest",
	sets: 2,
	weight: 225,
	rest_time: 100,
	intensity: 'high'
};

// GET
router.get('/workout_plan/:user_id', async (req: Request, res: Response, next: NextFunction) => {	
	res.status(200).send([dummy_data, dummy_data]);
});

// CREATE
router.post('/workout_plan/:user_id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const exercises = req.body.exercises;
		const exerciseIds = [];

		for (let i = 0; i < exercises.length; i++) {
			const existingExercise = await ExercisePlanModel.findOne({
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
			}
			else {
				const newExercisePlan = new ExercisePlanModel(exercises[i]);
				const savedExercisePlan = await newExercisePlan.save();
				exerciseIds.push(savedExercisePlan._id);
			}
		}

		const insertObj = {
			name: req.body.name,
			date: req.body.date,
			exercises: exerciseIds,
		}

		const newWorkoutPlan = new WorkoutPlanModel(insertObj);
		const savedWorkoutPlan = await newWorkoutPlan.save();

		// add new workoutPlan to user's workoutPlan array
		const user = await User.findById(req.params.user_id);
		if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
		user.workoutPlans.push(savedWorkoutPlan._id);
		await user.save();

		res.status(201).json({ status: 'success', data: savedWorkoutPlan })
	} catch (error) {
		res.status(500).json({ status: 'error', message: 'Failed to create workout plan' });
	}
});

// UPDATE
router.put('/workout_plan/:workout_plan_id', (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send({ status: 'success', data: dummy_data });
});

// DELETE
router.delete('/workout_plan/:workout_plan_id', (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send({ status: 'success', data: dummy_data });
});

export default router;
