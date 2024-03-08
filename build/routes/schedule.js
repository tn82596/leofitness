"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_1 = __importDefault(require("../models/schedule"));
const workoutPlan_1 = __importDefault(require("../models/workoutPlan"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
// Get a user's schedule
router.get('/schedule/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/schedule/{user_id}:
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
        const user = yield user_1.default.findById(user_id).populate('schedule');
        if (!user)
            return res.status(404).json({ status: 'error', message: 'User not found' });
        res.status(200).json({ status: 'success', data: user.schedule });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// Create a new schedule and update the schedule field
router.post('/schedule/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/schedule/{user_id}:
     *   post:
     *     tags:
     *       - Schedule
     *     summary: Create a new schedule and update the user's schedule field
     *     description: Create a new schedule with provided start and end dates, and update the user's schedule field accordingly.
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user for whom the new schedule is created.
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
     *                 description: Start date of the new schedule.
     *               endDate:
     *                 type: string
     *                 format: date
     *                 description: End date of the new schedule.
     *               workoutPlans:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/schemas/WorkoutPlan'
     *                 description: Array of workout plans associated with the new schedule.
     *     responses:
     *       '201':
     *         description: A successful response indicating that the schedule was created and the user's workoutPlans array was updated.
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
        const workoutPlans = req.body.workoutPlans;
        const workoutPlanIds = [];
        for (let i = 0; i < workoutPlans.length; i++) {
            const existingWorkoutPlan = yield workoutPlan_1.default.findOne({
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
            }
            else {
                const newWorkoutPlan = new workoutPlan_1.default(workoutPlans[i]);
                const savedWorkoutPlan = yield newWorkoutPlan.save();
                workoutPlanIds.push(savedWorkoutPlan._id);
            }
        }
        const insertObj = {
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            workoutPlans: workoutPlanIds,
        };
        const newSchedule = new schedule_1.default(insertObj);
        const savedSchedule = yield newSchedule.save();
        // add new schedule to user
        const user = yield user_1.default.findById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        user.schedule = savedSchedule._id;
        yield user.save();
        res.status(201).json({ status: 'success', data: savedSchedule });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// update a schedule
router.put('/schedule/:schedule_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/schedule/{schedule_id}:
     *   put:
     *     tags:
     *       - Schedule
     *     summary: Update a schedule
     *     description: Update an existing schedule with new start and end dates, and associated workout plans.
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
     *                 description: New start date for the schedule.
     *               endDate:
     *                 type: string
     *                 format: date
     *                 description: New end date for the schedule.
     *               workoutPlans:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/schemas/WorkoutPlan'
     *                 description: Array of updated workout plans associated with the schedule.
     *     responses:
     *       '200':
     *         description: A successful response indicating that the schedule was updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Success message indicating that the schedule was updated successfully.
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
     *                   description: Error message indicating that the schedule was not found.
     */
    try {
        const workoutPlans = req.body.workoutPlans;
        const workoutPlanIds = [];
        for (let i = 0; i < workoutPlans.length; i++) {
            const existingWorkoutPlan = yield workoutPlan_1.default.findOne({
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
            }
            else {
                const newWorkoutPlan = new workoutPlan_1.default(workoutPlans[i]);
                const savedWorkoutPlan = yield newWorkoutPlan.save();
                workoutPlanIds.push(savedWorkoutPlan._id);
            }
        }
        const updateObj = {
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            workoutPlans: workoutPlanIds,
        };
        const scheduleId = req.params.schedule_id;
        const updatedSchedule = yield schedule_1.default.findByIdAndUpdate(scheduleId, updateObj, {
            new: true,
        });
        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res
            .status(200)
            .json({ message: 'Schedule updated successfully', data: updatedSchedule });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// DELETE
router.delete('/schedule/:schedule_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const deletedSchedule = yield schedule_1.default.findByIdAndDelete(scheduleId);
        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).send({ status: 'success' });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
exports.default = router;
