import express, { Request, Response, NextFunction } from 'express';
import Schedule from '../models/schedule';
import WorkoutPlan from '../models/workoutPlan';
import User from '../models/user';

const router = express.Router();

// Get a user's schedule
router.get('/schedule/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @swagger
 * /schedule/user/{user_id}:
 *   get:
 *     tags:
 *       - Schedule
 *     summary: Get a user's schedule
 *     description: Retrieve a user's schedule with its associated workout plans and exercises by user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve the schedule for
 *     responses:
 *       '200':
 *         description: A successful response with the user's schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65eb4a669ec32c28f896bfc6
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-31T00:00:00.000Z"
 *                     workoutPlans:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 65ea92b94f0b59684764732f
 *                           name:
 *                             type: string
 *                             example: Push 1
 *                           category:
 *                             type: string
 *                             example: Push
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: 65ea84667da19f021117d59b
 *                                 name:
 *                                   type: string
 *                                   example: Bench Press
 *                                 description:
 *                                   type: string
 *                                   example: sit on bench and push heavy circle
 *                                 icon:
 *                                   type: string
 *                                   example: img.png
 *                                 muscleType:
 *                                   type: string
 *                                   example: Chest
 *                                 sets:
 *                                   type: number
 *                                   example: 3
 *                                 reps:
 *                                   type: number
 *                                   example: 8
 *                                 weight:
 *                                   type: number
 *                                   example: 185
 *                                 restTime:
 *                                   type: number
 *                                   example: 90
 *                                 intensity:
 *                                   type: string
 *                                   example: high
 *                             example:
 *                               - _id: 65ea84667da19f021117d59b
 *                                 name: Bench Press
 *                                 description: sit on bench and push heavy circle
 *                                 icon: img.png
 *                                 muscleType: Chest
 *                                 sets: 3
 *                                 reps: 8
 *                                 weight: 185
 *                                 restTime: 90
 *                                 intensity: high
 *                           __v:
 *                             type: number
 *                             example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-08T17:27:02.619Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-08T17:27:59.728Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 *       '404':
 *         description: The user associated with the provided ID was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User not found
 */
	try {
		const user_id = req.params.user_id;
		const user = await User.findById(user_id)
		.populate({
			path: 'schedule',
			populate: {
				path: 'workoutPlans',
				model: 'WorkoutPlan',
				populate: {
					path: 'exercises',
					model: 'ExercisePlan'
				}
			}
    	});
		if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

		res.status(200).json({ status: 'success', data: user.schedule });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// Get a schedule by schedule id
router.get('/schedule/:schedule_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @swagger
 * /schedule/{schedule_id}:
 *   get:
 *     tags:
 *       - Schedule
 *     summary: Get a schedule by schedule ID
 *     description: Retrieve a schedule with its associated workout plans and exercises by schedule ID.
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the schedule to retrieve
 *     responses:
 *       '200':
 *         description: A successful response with the requested schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65eb4a669ec32c28f896bfc6
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-31T00:00:00.000Z"
 *                     workoutPlans:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 65ea92b94f0b59684764732f
 *                           name:
 *                             type: string
 *                             example: Push 1
 *                           category:
 *                             type: string
 *                             example: Push
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: 65ea84667da19f021117d59b
 *                                 name:
 *                                   type: string
 *                                   example: Bench Press
 *                                 description:
 *                                   type: string
 *                                   example: sit on bench and push heavy circle
 *                                 icon:
 *                                   type: string
 *                                   example: img.png
 *                                 muscleType:
 *                                   type: string
 *                                   example: Chest
 *                                 sets:
 *                                   type: number
 *                                   example: 3
 *                                 reps:
 *                                   type: number
 *                                   example: 8
 *                                 weight:
 *                                   type: number
 *                                   example: 185
 *                                 restTime:
 *                                   type: number
 *                                   example: 90
 *                                 intensity:
 *                                   type: string
 *                                   example: high
 *                             example:
 *                               - _id: 65ea84667da19f021117d59b
 *                                 name: Bench Press
 *                                 description: sit on bench and push heavy circle
 *                                 icon: img.png
 *                                 muscleType: Chest
 *                                 sets: 3
 *                                 reps: 8
 *                                 weight: 185
 *                                 restTime: 90
 *                                 intensity: high
 *                           __v:
 *                             type: number
 *                             example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-08T17:27:02.619Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-08T17:27:59.728Z"
 *                     __v:
 *                       type: number
 *                       example: 0
 *       '404':
 *         description: The requested schedule was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule not found
 */
	try {
		const scheduleId = req.params.schedule_id;
		const schedule = await Schedule.findById(scheduleId)
		.populate({
			path:'workoutPlans',
			model:'WorkoutPlan',
			populate: { path: 'exercises', model: 'ExercisePlan' }
		});
		
		if (!schedule) {
			return res.status(404).json({ message: 'Schedule not found' });
		}
		res.status(200).json({ status: 'success', data: schedule });
	} catch (err) {
		console.log(err);
		next(err);
	}
},
);

// Create a new schedule and update the schedule field
router.post('/schedule/:user_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @openapi
 * /schedule/{user_id}:
 *   post:
 *     tags:
 *       - Schedule
 *     summary: Create a new schedule and update the schedule field
 *     description: Create a new schedule for a user and update the schedule field in the user document.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user for whom the schedule is being created.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the schedule.
 *                 example: "2024-03-08"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the schedule.
 *                 example: "2024-03-15"
 *               workoutPlans:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of workout plan IDs associated with the schedule.
 *                 example:
 *                   - "65ea90c14f0b596847647320"
 *                   - "65ea92b94f0b59684764732f"
 *     responses:
 *       '201':
 *         description: Successfully created a new schedule and updated the user's schedule field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success).
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       description: The start date of the schedule.
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       description: The end date of the schedule.
 *                     workoutPlans:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Array of workout plan IDs associated with the schedule.
 *                     _id:
 *                       type: string
 *                       description: The ID of the created schedule.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the schedule was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the schedule was last updated.
 *                     __v:
 *                       type: integer
 *                       description: Version key.
 *       '404':
 *         description: User not found or one or more workout plans not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user was not found or one or more workout plans were not found.
 *                   example: One or more workout plans not found
 */
	try {
		const insertObj = req.body;

		if (insertObj.hasOwnProperty('workoutPlans')) {
			const workoutPlans = req.body.workoutPlans;
			const existingWorkoutPlans = await WorkoutPlan.find({ _id: { $in: workoutPlans } });
        	if (existingWorkoutPlans.length !== workoutPlans.length) {
            	return res.status(404).json({ message: 'One or more workout plans not found' });
        	}
		}

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

// update a schedule
router.put('/schedule/:schedule_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @openapi
 * /schedule/{schedule_id}:
 *   put:
 *     tags:
 *       - Schedule
 *     summary: Update a schedule
 *     description: Update an existing schedule by providing its ID.
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the schedule to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the schedule.
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the schedule.
 *                 example: "2024-12-31"
 *               workoutPlans:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of workout plan IDs associated with the schedule.
 *                 example:
 *                   - "65ea92b94f0b59684764732f"
 *                   - "65ea90c14f0b596847647320"
 *                   - "65eb2d8f4f275e76b6a724a9"
 *     responses:
 *       '200':
 *         description: Schedule updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the schedule was updated successfully.
 *                   example: Schedule updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       '404':
 *         description: Schedule not found or one or more workout plans not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the schedule was not found or one or more workout plans were not found.
 *                   example: One or more workout plans not found
 */
	try {
		const updateObj = req.body;
		
		if (updateObj.hasOwnProperty('workoutPlans')) {
			const workoutPlans = req.body.workoutPlans;
			const existingWorkoutPlans = await WorkoutPlan.find({ _id: { $in: workoutPlans } });
        	if (existingWorkoutPlans.length !== workoutPlans.length) {
            	return res.status(404).json({ message: 'One or more workout plans not found' });
        	}
		}

		const scheduleId = req.params.schedule_id;
		const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updateObj, {
			new: true,
		});

		if (!updatedSchedule) {
			return res.status(404).json({ message: 'Schedule not found' });
		}
		res.status(200).json({ message: 'Schedule updated successfully', data: updatedSchedule });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// DELETE
router.delete('/schedule/:schedule_id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		/**
 * @openapi
 * /schedule/{schedule_id}:
 *   delete:
 *     tags:
 *       - Schedule
 *     summary: Delete a schedule
 *     description: Delete an existing schedule by providing its ID.
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the schedule to be deleted.
 *     responses:
 *       '200':
 *         description: Schedule successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: A success message indicating that the schedule was deleted successfully.
 *                   example: Schedule successfully deleted
 *       '404':
 *         description: Schedule not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the schedule was not found.
 *                   example: Schedule not found
 */
		const scheduleId = req.params.schedule_id;
		const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);

		if (!deletedSchedule) {
			return res.status(404).json({ message: 'Schedule not found' });
		}
		res.status(200).send({ status: 'Schedule successfully deleted' });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

export default router;
