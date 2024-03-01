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
const workoutPlan_1 = __importDefault(require("../models/workoutPlan"));
const exercisePlan_1 = __importDefault(require("../models/exercisePlan"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
// Get all workout plans belonging to a certain user
router.get('/workout_plan/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield user_1.default.findById(userId).populate('workoutPlans');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: user.workoutPlans });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// Get all workout plans belonging to a user associated with a certain category
router.get('/workout_plan/:user_id/category/:category', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_plan/{user_id}/category/{category}:
     *   get:
     *     summary: Get all workout plans belonging to a user associated with a certain category
     *     description: Retrieve all workout plans belonging to a user associated with a specific category based on the provided user ID and category.
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user whose workout plans need to be retrieved.
     *       - in: path
     *         name: category
     *         required: true
     *         schema:
     *           type: string
     *         description: Category of the workout plans to be retrieved.
     *     responses:
     *       '200':
     *         description: A successful response with the workout plans belonging to the user and matching the specified category.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (success).
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/WorkoutPlan'
     *                   description: Array of workout plans belonging to the user and matching the specified category.
     *       '404':
     *         description: User not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating that the user was not found.
     */
    try {
        const userId = req.params.user_id;
        const category = req.params.category;
        const user = yield user_1.default.findById(userId).populate({
            path: 'workoutPlans',
            match: { category: category },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: user.workoutPlans });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// Get a specific workout plan based on workout plan ID
router.get('/workout_plan/:workout_plan_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_plan/{workout_plan_id}:
     *   get:
     *     summary: Get a specific workout plan based on workout plan ID
     *     description: Retrieve a specific workout plan based on the provided workout plan ID.
     *     parameters:
     *       - in: path
     *         name: workout_plan_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the workout plan to retrieve.
     *     responses:
     *       '200':
     *         description: A successful response with the requested workout plan.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (success).
     *                 data:
     *                   $ref: '#/components/schemas/WorkoutPlan'
     *       '404':
     *         description: Workout plan not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Error message indicating that the workout plan was not found.
     */
    try {
        const workoutPlanId = req.params.workout_plan_id;
        const workoutPlan = yield workoutPlan_1.default.findById(workoutPlanId);
        if (!workoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }
        res.status(200).json({ status: 'success', data: workoutPlan });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// Create a new workout plan and update the user's workoutPlans array
router.post('/workout_plan/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_plan/{user_id}:
     *   post:
     *     tags:
     *       - Workout Plan
     *     summary: Create a new workout plan for a user
     *     description: Create a new workout plan and associate it with the specified user.
     *     parameters:
     *       - in: path
     *         name: user_id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the user to whom the workout plan belongs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               category:
     *                 type: string
     *               exercises:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/schemas/ExercisePlan'
     *     responses:
     *       '201':
     *         description: Successfully created a new workout plan
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   $ref: '#/components/schemas/WorkoutPlan'
     *       '404':
     *         description: User not found
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
     *       '500':
     *         description: Internal server error
     */
    try {
        const exercises = req.body.exercises;
        const exerciseIds = [];
        for (let i = 0; i < exercises.length; i++) {
            const existingExercise = yield exercisePlan_1.default.findOne({
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
                const newExercisePlan = new exercisePlan_1.default(exercises[i]);
                const savedExercisePlan = yield newExercisePlan.save();
                exerciseIds.push(savedExercisePlan._id);
            }
        }
        const insertObj = {
            name: req.body.name,
            category: req.body.category,
            exercises: exerciseIds,
        };
        const newWorkoutPlan = new workoutPlan_1.default(insertObj);
        const savedWorkoutPlan = yield newWorkoutPlan.save();
        // add new workoutPlan to user's workoutPlan array
        const user = yield user_1.default.findById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        user.workoutPlans.push(savedWorkoutPlan._id);
        yield user.save();
        res.status(201).json({ status: 'success', data: savedWorkoutPlan });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// UPDATE
router.put('/workout_plan/:workout_plan_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_plan/{workout_plan_id}:
     *   put:
     *     tags:
     *       - Workout Plan
     *     summary: Update an existing workout plan
     *     description: Update an existing workout plan identified by the workout_plan_id.
     *     parameters:
     *       - in: path
     *         name: workout_plan_id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the workout plan to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/WorkoutPlan'
     *     responses:
     *       '200':
     *         description: Successfully updated the workout plan
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Workout plan updated successfully
     *                 data:
     *                   $ref: '#/components/schemas/WorkoutPlan'
     *       '404':
     *         description: Workout plan not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Workout plan not found
     *       '500':
     *         description: Internal server error
     */
    try {
        const workoutPlanId = req.params.workout_plan_id;
        const updateObj = req.body;
        const exercises = req.body.exercises;
        const exerciseIds = [];
        for (let i = 0; i < exercises.length; i++) {
            const existingExercise = yield exercisePlan_1.default.findOne({
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
                const newExercisePlan = new exercisePlan_1.default(exercises[i]);
                const savedExercisePlan = yield newExercisePlan.save();
                exerciseIds.push(savedExercisePlan._id);
            }
        }
        updateObj.exercises = exerciseIds;
        const updatedWorkoutPlan = yield workoutPlan_1.default.findByIdAndUpdate(workoutPlanId, updateObj, {
            new: true,
        });
        if (!updatedWorkoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }
        res
            .status(200)
            .json({ message: 'Workout plan updated successfully', data: updatedWorkoutPlan });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// DELETE
router.delete('/workout_plan/:workout_plan_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_plan/{workout_plan_id}:
     *   delete:
     *     tags:
     *       - Workout Plan
     *     summary: Delete a workout plan
     *     description: Delete a workout plan identified by the workout_plan_id.
     *     parameters:
     *       - in: path
     *         name: workout_plan_id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of the workout plan to delete
     *     responses:
     *       '200':
     *         description: Successfully deleted the workout plan
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *       '404':
     *         description: Workout plan not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Workout plan not found
     *       '500':
     *         description: Internal server error
     */
    try {
        const workoutPlanId = req.params.workout_plan_id;
        const deletedWorkoutPlan = yield workoutPlan_1.default.findByIdAndDelete(workoutPlanId);
        if (!deletedWorkoutPlan) {
            return res.status(404).json({ message: 'Workout plan not found' });
        }
        res.status(200).send({ status: 'success' });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
exports.default = router;
