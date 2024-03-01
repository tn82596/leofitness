import express, { Request, Response, NextFunction } from 'express';
import Schedule from '../models/schedule';
import WorkoutPlan from '../models/workoutPlan';
import User from '../models/user';

const router = express.Router();

// Create a new workout plan and update the user's workoutPlans array
router.post('/schedule/:user_id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const workoutPlans = req.body.workoutPlans;
		const workoutPlanIds = [];

		for (let i = 0; i < workoutPlans.length; i++) {
			const existingWorkoutPlan = await WorkoutPlan.findOne({
				name: workoutPlans[i].name,
				description: workoutPlans[i].description,
				icon: workoutPlans[i].icon,
				muscleType: workoutPlans[i].muscleType,
				sets: workoutPlans[i].sets,
				weight: workoutPlans[i].weight,
				restTime: workoutPlans[i].restTime,
				intensity: workoutPlans[i].intensity,
			});
			if (existingWorkoutPlan) {
				workoutPlanIds.push(existingWorkoutPlan._id);
			} else {
				const newWorkoutPlan = new WorkoutPlan(workoutPlans[i]);
				const savedWorkoutPlan = await newWorkoutPlan.save();
				workoutPlanIds.push(savedWorkoutPlan._id);
			}
		}

		const insertObj = {
			name: req.body.name,
			category: req.body.category,
			workoutPlans: workoutPlanIds,
		};

		const newSchedule = new Schedule(insertObj);
		const savedSchedule = await newSchedule.save();

		// add new schedule to user
		const user = await User.findById(req.params.user_id);
		if (!user) {
			return res.status(404).json({ status: 'error', message: 'User not found' });
		}
		user.schedule = savedSchedule._id;
		await user.save();

		res.status(201).json({ status: 'success', data: savedSchedule });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

export default router;
