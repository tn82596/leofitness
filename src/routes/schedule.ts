import express, { Request, Response, NextFunction } from 'express';
import Schedule from '../models/schedule';
import WorkoutPlan from '../models/workoutPlan';
import User from '../models/user';

const router = express.Router();

// Get a user's schedule
router.get('/schedule/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @openapi
 * /api/schedule/user/{user_id}:
 *   get:
 *     tags:
 *       - Schedule
 *     summary: Get a user's schedule
 *     description: Retrieve a user's schedule based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose schedule needs to be retrieved.
 *     responses:
 *       '200':
 *         description: A successful response with the user's schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success).
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Error status indicating that the user was not found.
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user was not found.
 */
	try {
		const user_id = req.params.user_id;
		const user = await User.findById(user_id).populate({
			path: 'schedule',
			populate: { path: 'workoutPlans' } 
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
 * @openapi
 * /schedule/{schedule_id}:
 *   get:
 *     tags:
 *       - Schedule
 *     summary: Get a schedule by schedule ID
 *     description: Retrieve a schedule based on the provided schedule ID.
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the schedule to be retrieved.
 *     responses:
 *       '200':
 *         description: A successful response with the schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       '404':
 *         description: Schedule not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule not found.
 */
	try {
		const scheduleId = req.params.schedule_id;
		const schedule = await Schedule.findById(scheduleId).populate('workoutPlans');

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
 *     summary: Create a new schedule for a user
 *     description: Create a new schedule for a user based on the provided user and workout plan IDs.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user for whom the schedule needs to be created.
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             startDate:
 *               type: string
 *               format: date
 *               description: The start date of the schedule
 *             endDate:
 *               type: string
 *               format: date
 *               description: The end date of the schedule
 *             workoutPlanIds:
 *               type: array
 *               items:
 *                 type: string
 *               description: An array of workout plan IDs associated with the schedule
 *     responses:
 *       '201':
 *         description: Successfully created a new schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       '404':
 *         description: One or more workout plans not found or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: One or more workout plans not found or user not found
 */
	try {
		const { startDate, endDate, workoutPlans } = req.body;
		
		// Validate input data
        if (!startDate || !endDate || !workoutPlans || !Array.isArray(workoutPlans)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Check if all provided workout plan IDs exist
        const existingWorkoutPlans = await WorkoutPlan.find({ _id: { $in: workoutPlans } });
        if (existingWorkoutPlans.length !== workoutPlans.length) {
            return res.status(404).json({ message: 'One or more workout plans not found' });
        }

        const newSchedule = new Schedule({
            startDate,
            endDate,
            workoutPlans,
        });

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
 *     description: Update a schedule based on the provided schedule ID and update object.
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the schedule to be updated.
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             workoutPlans:
 *               type: array
 *               items:
 *                 type: string
 *               description: An array of updated workout plan IDs associated with the schedule
 *     responses:
 *       '200':
 *         description: Successfully updated the schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       '404':
 *         description: One or more workout plans not found or schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: One or more workout plans not found or schedule not found
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
		const updatedSchedule = await WorkoutPlan.findByIdAndUpdate(scheduleId, updateObj, {
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
	/**
	 * @openapi
	 * /api/schedule/{schedule_id}:
	 *   delete:
	 *     tags:
	 *       - Schedule
	 *     summary: Delete a schedule
	 *     description: Delete an existing schedule.
	 *     parameters:
	 *       - in: path
	 *         name: schedule_id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: ID of the schedule to be deleted.
	 *     responses:
	 *       '200':
	 *         description: A successful response indicating that the schedule was deleted successfully.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 status:
	 *                   type: string
	 *                   description: Success status indicating that the schedule was deleted successfully.
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
	 */
	try {
		const scheduleId = req.params.schedule_id;
		const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);

		if (!deletedSchedule) {
			return res.status(404).json({ message: 'Schedule not found' });
		}
		res.status(200).send({ status: 'success' });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

export default router;
