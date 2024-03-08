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
router.get('/workout_plan/user/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /**
         * @openapi
         * /workout_plan/user/{user_id}:
         *   get:
         *     tags:
         *       - Workout Plan
         *     summary: Get all workout plans for a user
         *     description: Retrieve all workout plans belonging to a specific user.
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID of the user whose workout plans are to be retrieved.
         *     responses:
         *       '200':
         *         description: A successful response with workout plans belonging to the specified user.
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
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       _id:
         *                         type: string
         *                         description: The ID of the workout plan.
         *                       name:
         *                         type: string
         *                         description: The name of the workout plan.
         *                       category:
         *                         type: string
         *                         description: The category of the workout plan.
         *                       exercises:
         *                         type: array
         *                         items:
         *                           type: object
         *                           properties:
         *                             _id:
         *                               type: string
         *                               description: The ID of the exercise.
         *                             name:
         *                               type: string
         *                               description: The name of the exercise.
         *                             description:
         *                               type: string
         *                               description: The description of the exercise.
         *                             icon:
         *                               type: string
         *                               description: The icon of the exercise.
         *                             muscleType:
         *                               type: string
         *                               description: The muscle type targeted by the exercise.
         *                             sets:
         *                               type: integer
         *                               description: The number of sets for the exercise.
         *                             reps:
         *                               type: integer
         *                               description: The number of repetitions for the exercise.
         *                             weight:
         *                               type: number
         *                               description: The weight used for the exercise.
         *                             restTime:
         *                               type: integer
         *                               description: The rest time between sets for the exercise.
         *                             intensity:
         *                               type: string
         *                               description: The intensity level of the exercise.
         *                             __v:
         *                               type: integer
         *                               description: Version key.
         *                   example:
         *                     - _id: "65ea90c14f0b596847647320"
         *                       name: "Pull 1"
         *                       category: "Pull"
         *                       exercises:
         *                         - _id: "65ea89227da19f021117d5ba"
         *                           name: "Dumbell Curl"
         *                           description: "stand up and curl dumbbell"
         *                           icon: "img.png"
         *                           muscleType: "Biceps"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 30
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea89227da19f021117d5bd"
         *                           name: "Lat Pulldown"
         *                           description: "Sit on pulldown machine and pull bar down"
         *                           icon: "img.png"
         *                           muscleType: "Back"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 130
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea89227da19f021117d5c0"
         *                           name: "Incline Dumbell Curls"
         *                           description: "sit on incline bench and curl dumbbell"
         *                           icon: "img.png"
         *                           muscleType: "Biceps"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 25
         *                           restTime: 90
         *                           intensity: "medium"
         *                           __v: 0
         *                         - _id: "65ea8d049cc6697cd140ff7d"
         *                           name: "Seated Rows"
         *                           description: "Sit on row machine and pull bar back"
         *                           icon: "Upper Chest"
         *                           muscleType: "Back"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 55
         *                           restTime: 90
         *                           intensity: "medium"
         *                           __v: 0
         *                       __v: 0
         *                     - _id: "65ea92b94f0b59684764732f"
         *                       name: "Push 1"
         *                       category: "Push"
         *                       exercises:
         *                         - _id: "65ea84667da19f021117d59b"
         *                           name: "Bench Press"
         *                           description: "sit on bench and push heavy circle"
         *                           icon: "img.png"
         *                           muscleType: "Chest"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 185
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea87317da19f021117d5aa"
         *                           name: "Shoulder Press"
         *                           description: "sit on shoulder machine and push weight up"
         *                           icon: "img.png"
         *                           muscleType: "Shoulders"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 70
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea87317da19f021117d5ad"
         *                           name: "Tricep Pulldowns"
         *                           description: "bend knees, hold rope and pull down"
         *                           icon: "img.png"
         *                           muscleType: "Triceps"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 47.5
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea92b94f0b59684764732c"
         *                           name: "Incline Dumbell Press"
         *                           description: "sit on incline bench "
         *                           icon: "img.png"
         *                           muscleType: "Upper Chest"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 55
         *                           restTime: 90
         *                           intensity: "medium"
         *                           __v: 0
         *                         - _id: "65ea87317da19f021117d5b3"
         *                           name: "Lateral Raises"
         *                           description: "Stand up with a slight lean and raise dumbbell to the side"
         *                           icon: "img.png"
         *                           muscleType: "Side Delts"
         *                           sets: 3
         *                           reps: 12
         *                           weight: 25
         *                           restTime: 90
         *                           intensity: "medium"
         *                           __v: 0
         *                       __v: 0
         *       '404':
         *         description: User not found or no workout plans found for the specified user.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   description: Error message indicating that the user was not found or no workout plans were found for the specified user.
         *                   example: User not found
         */
        const userId = req.params.user_id;
        const user = yield user_1.default.findById(userId)
            .populate({
            path: 'workoutPlans',
            model: 'WorkoutPlan',
            populate: { path: 'exercises', model: 'ExercisePlan' }
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
// Get all workout plans belonging to a user associated with a certain category
router.get('/workout_plan/user/:user_id/category/:category', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /**
         * @openapi
         * /workout_plan/user/{user_id}/category/{category}:
         *   get:
         *     tags:
         *       - Workout Plan
         *     summary: Get all workout plans by category for a user
         *     description: Retrieve all workout plans belonging to a specific user associated with a certain category.
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID of the user whose workout plans are to be retrieved.
         *       - in: path
         *         name: category
         *         required: true
         *         schema:
         *           type: string
         *         description: Category of the workout plans to be retrieved.
         *     responses:
         *       '200':
         *         description: A successful response with workout plans belonging to the specified category for the user.
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
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       _id:
         *                         type: string
         *                         description: The ID of the workout plan.
         *                       name:
         *                         type: string
         *                         description: The name of the workout plan.
         *                       category:
         *                         type: string
         *                         description: The category of the workout plan.
         *                       exercises:
         *                         type: array
         *                         items:
         *                           type: object
         *                           properties:
         *                             _id:
         *                               type: string
         *                               description: The ID of the exercise.
         *                             name:
         *                               type: string
         *                               description: The name of the exercise.
         *                             description:
         *                               type: string
         *                               description: The description of the exercise.
         *                             icon:
         *                               type: string
         *                               description: The icon of the exercise.
         *                             muscleType:
         *                               type: string
         *                               description: The muscle type targeted by the exercise.
         *                             sets:
         *                               type: integer
         *                               description: The number of sets for the exercise.
         *                             reps:
         *                               type: integer
         *                               description: The number of repetitions for the exercise.
         *                             weight:
         *                               type: number
         *                               description: The weight used for the exercise.
         *                             restTime:
         *                               type: integer
         *                               description: The rest time between sets for the exercise.
         *                             intensity:
         *                               type: string
         *                               description: The intensity level of the exercise.
         *                             __v:
         *                               type: integer
         *                               description: Version key.
         *                   example:
         *                     - _id: "65ea92b94f0b59684764732f"
         *                       name: "Push 1"
         *                       category: "Push"
         *                       exercises:
         *                         - _id: "65ea84667da19f021117d59b"
         *                           name: "Bench Press"
         *                           description: "sit on bench and push heavy circle"
         *                           icon: "img.png"
         *                           muscleType: "Chest"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 185
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea87317da19f021117d5aa"
         *                           name: "Shoulder Press"
         *                           description: "sit on shoulder machine and push weight up"
         *                           icon: "img.png"
         *                           muscleType: "Shoulders"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 70
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea87317da19f021117d5ad"
         *                           name: "Tricep Pulldowns"
         *                           description: "bend knees, hold rope and pull down"
         *                           icon: "img.png"
         *                           muscleType: "Triceps"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 47.5
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                       __v: 0
         *                     - _id: "65eb2d8f4f275e76b6a724a9"
         *                       name: "Push 2"
         *                       category: "Push"
         *                       exercises:
         *                         - _id: "65ea84667da19f021117d59b"
         *                           name: "Bench Press"
         *                           description: "sit on bench and push heavy circle"
         *                           icon: "img.png"
         *                           muscleType: "Chest"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 185
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea87317da19f021117d5aa"
         *                           name: "Shoulder Press"
         *                           description: "sit on shoulder machine and push weight up"
         *                           icon: "img.png"
         *                           muscleType: "Shoulders"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 70
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                         - _id: "65ea87317da19f021117d5ad"
         *                           name: "Tricep Pulldowns"
         *                           description: "bend knees, hold rope and pull down"
         *                           icon: "img.png"
         *                           muscleType: "Triceps"
         *                           sets: 3
         *                           reps: 8
         *                           weight: 47.5
         *                           restTime: 90
         *                           intensity: "high"
         *                           __v: 0
         *                       __v: 0
         *       '404':
         *         description: User not found or no workout plans found for the specified category.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   description: Error message indicating that the user was not found or no workout plans were found for the specified category.
         *                   example: User not found
         */
        const userId = req.params.user_id;
        const category = req.params.category;
        const user = yield user_1.default.findById(userId).populate({
            path: 'workoutPlans',
            model: 'WorkoutPlan',
            match: { category: category },
            populate: { path: 'exercises', model: 'ExercisePlan' }
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
    try {
        /**
         * @openapi
         * /workout_plan/{workout_plan_id}:
         *   get:
         *     tags:
         *       - Workout Plan
         *     summary: Get a specific workout plan
         *     description: Retrieve details of a specific workout plan based on the provided workout plan ID.
         *     parameters:
         *       - in: path
         *         name: workout_plan_id
         *         required: true
         *         schema:
         *           type: string
         *         description: ID of the workout plan to be retrieved.
         *     responses:
         *       '200':
         *         description: A successful response with the workout plan details.
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
         *                     _id:
         *                       type: string
         *                       description: The ID of the workout plan.
         *                     name:
         *                       type: string
         *                       description: The name of the workout plan.
         *                     category:
         *                       type: string
         *                       description: The category of the workout plan.
         *                     exercises:
         *                       type: array
         *                       items:
         *                         type: object
         *                         properties:
         *                           _id:
         *                             type: string
         *                             description: The ID of the exercise.
         *                           name:
         *                             type: string
         *                             description: The name of the exercise.
         *                           description:
         *                             type: string
         *                             description: The description of the exercise.
         *                           icon:
         *                             type: string
         *                             description: The icon of the exercise.
         *                           muscleType:
         *                             type: string
         *                             description: The muscle type targeted by the exercise.
         *                           sets:
         *                             type: integer
         *                             description: The number of sets for the exercise.
         *                           reps:
         *                             type: integer
         *                             description: The number of repetitions for the exercise.
         *                           weight:
         *                             type: number
         *                             description: The weight used for the exercise.
         *                           restTime:
         *                             type: integer
         *                             description: The rest time between sets for the exercise.
         *                           intensity:
         *                             type: string
         *                             description: The intensity level of the exercise.
         *                     __v:
         *                       type: integer
         *                       description: Version key.
         *                   example:
         *                     _id: "65ea92b94f0b59684764732f"
         *                     name: "Push 1"
         *                     category: "Push"
         *                     exercises:
         *                       - _id: "65ea84667da19f021117d59b"
         *                         name: "Bench Press"
         *                         description: "sit on bench and push heavy circle"
         *                         icon: "img.png"
         *                         muscleType: "Chest"
         *                         sets: 3
         *                         reps: 8
         *                         weight: 185
         *                         restTime: 90
         *                         intensity: "high"
         *                         __v: 0
         *                       - _id: "65ea87317da19f021117d5aa"
         *                         name: "Shoulder Press"
         *                         description: "sit on shoulder machine and push weight up"
         *                         icon: "img.png"
         *                         muscleType: "Shoulders"
         *                         sets: 3
         *                         reps: 8
         *                         weight: 70
         *                         restTime: 90
         *                         intensity: "high"
         *                         __v: 0
         *                       - _id: "65ea87317da19f021117d5ad"
         *                         name: "Tricep Pulldowns"
         *                         description: "bend knees, hold rope and pull down"
         *                         icon: "img.png"
         *                         muscleType: "Triceps"
         *                         sets: 3
         *                         reps: 8
         *                         weight: 47.5
         *                         restTime: 90
         *                         intensity: "high"
         *                         __v: 0
         *                     __v: 0
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
         *                   example: Workout plan not found.
         */
        const workoutPlanId = req.params.workout_plan_id;
        const workoutPlan = yield workoutPlan_1.default.findById(workoutPlanId).populate('exercises');
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
     * /workout_plan/{user_id}:
     *   post:
     *     tags:
     *       - Workout Plan
     *     summary: Create a new workout plan and update the user's workoutPlans array
     *     description: Create a new workout plan with the provided data and update the user's workoutPlans array with the newly created workout plan.
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user whose workout plan is to be created.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the workout plan.
     *                 example: Push 1
     *               category:
     *                 type: string
     *                 description: The category of the workout plan.
     *                 example: Push
     *               exercises:
     *                 type: array
     *                 description: An array of exercise objects comprising the workout plan.
     *                 items:
     *                   type: object
     *                   properties:
     *                     name:
     *                       type: string
     *                       description: The name of the exercise.
     *                       example: Bench Press
     *                     description:
     *                       type: string
     *                       description: The description of the exercise.
     *                       example: sit on bench and push heavy circle
     *                     icon:
     *                       type: string
     *                       description: The icon URL of the exercise.
     *                       example: img.png
     *                     muscleType:
     *                       type: string
     *                       description: The muscle type targeted by the exercise.
     *                       example: Chest
     *                     sets:
     *                       type: number
     *                       description: The number of sets for the exercise.
     *                       example: 3
     *                     reps:
     *                       type: number
     *                       description: The number of repetitions for the exercise.
     *                       example: 8
     *                     weight:
     *                       type: number
     *                       description: The weight for the exercise.
     *                       example: 185
     *                     restTime:
     *                       type: number
     *                       description: The rest time in seconds between sets for the exercise.
     *                       example: 90
     *                     intensity:
     *                       type: string
     *                       description: The intensity level of the exercise.
     *                       example: high
     *     responses:
     *       '201':
     *         description: Successfully created a new workout plan and updated the user's workoutPlans array
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
     *                     name:
     *                       type: string
     *                       description: The name of the created workout plan.
     *                       example: Push 1
     *                     category:
     *                       type: string
     *                       description: The category of the created workout plan.
     *                       example: Push
     *                     exercises:
     *                       type: array
     *                       description: An array of exercise IDs associated with the workout plan.
     *                       items:
     *                         type: string
     *                       example: ["65ea84667da19f021117d59b"]
     *                     _id:
     *                       type: string
     *                       description: The unique identifier of the created workout plan.
     *                       example: 65ea92b94f0b59684764732f
     *                     __v:
     *                       type: integer
     *                       description: The version of the workout plan document.
     *                       example: 0
     *       '404':
     *         description: User not found.
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
     *                   example: User not found.
     */
    try {
        const insertObj = req.body;
        if (insertObj.hasOwnProperty('exercises')) {
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
            insertObj.exercises = exerciseIds;
        }
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
     * /workout_plan/{workout_plan_id}:
     *   put:
     *     tags:
     *       - Workout Plan
     *     summary: Update a workout plan
     *     description: Update an existing workout plan with the provided data.
     *     parameters:
     *       - in: path
     *         name: workout_plan_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the workout plan to be updated.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The updated name of the workout plan.
     *                 example: Push 1 version 2
     *               exercises:
     *                 type: array
     *                 description: An array of exercise objects comprising the updated workout plan.
     *                 items:
     *                   type: object
     *                   properties:
     *                     name:
     *                       type: string
     *                       description: The name of the exercise.
     *                       example: Bench Press
     *                     description:
     *                       type: string
     *                       description: The description of the exercise.
     *                       example: sit on bench and push heavy circle
     *                     icon:
     *                       type: string
     *                       description: The icon URL of the exercise.
     *                       example: img.png
     *                     muscleType:
     *                       type: string
     *                       description: The muscle type targeted by the exercise.
     *                       example: Chest
     *                     sets:
     *                       type: number
     *                       description: The number of sets for the exercise.
     *                       example: 3
     *                     reps:
     *                       type: number
     *                       description: The number of repetitions for the exercise.
     *                       example: 8
     *                     weight:
     *                       type: number
     *                       description: The weight for the exercise.
     *                       example: 185
     *                     restTime:
     *                       type: number
     *                       description: The rest time in seconds between sets for the exercise.
     *                       example: 90
     *                     intensity:
     *                       type: string
     *                       description: The intensity level of the exercise.
     *                       example: high
     *                 example:
     *                   - name: Bench Press
     *                     description: sit on bench and push heavy circle
     *                     icon: img.png
     *                     muscleType: Chest
     *                     sets: 3
     *                     reps: 8
     *                     weight: 185
     *                     restTime: 90
     *                     intensity: high
     *                   - name: Shoulder Press
     *                     description: sit on shoulder machine and push weight up
     *                     icon: img.png
     *                     muscleType: Shoulders
     *                     sets: 3
     *                     reps: 8
     *                     weight: 70
     *                     restTime: 90
     *                     intensity: high
     *                   - name: Tricep Pulldowns
     *                     description: bend knees, hold rope and pull down
     *                     icon: img.png
     *                     muscleType: Triceps
     *                     sets: 3
     *                     reps: 8
     *                     weight: 47.5
     *                     restTime: 90
     *                     intensity: high
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
     *                   type: object
     *                   properties:
     *                     _id:
     *                       type: string
     *                       description: The unique identifier of the updated workout plan.
     *                       example: 65ea92b94f0b59684764732f
     *                     name:
     *                       type: string
     *                       description: The updated name of the workout plan.
     *                       example: Push 1 version 2
     *                     category:
     *                       type: string
     *                       description: The category of the updated workout plan.
     *                       example: Push
     *                     exercises:
     *                       type: array
     *                       description: An array of exercise IDs associated with the updated workout plan.
     *                       items:
     *                         type: string
     *                       example: ["65ea84667da19f021117d59b", "65ea87317da19f021117d5aa", "65ea87317da19f021117d5ad"]
     *                     __v:
     *                       type: integer
     *                       description: The version of the workout plan document.
     *                       example: 0
     *       '404':
     *         description: Workout plan not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Workout plan not found.
     */
    try {
        const updateObj = req.body;
        if (updateObj.hasOwnProperty('exercises')) {
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
        }
        const workoutPlanId = req.params.workout_plan_id;
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
     * /workout_plan/{workout_plan_id}:
     *   delete:
     *     tags:
     *       - Workout Plan
     *     summary: Delete a workout plan
     *     description: Delete an existing workout plan based on the provided workout plan ID.
     *     parameters:
     *       - in: path
     *         name: workout_plan_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the workout plan to be deleted.
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
     *                   description: Status of the response.
     *                   example: success
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
     *                   example: Workout plan not found.
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
