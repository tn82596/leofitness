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
const workoutSession_1 = __importDefault(require("../models/workoutSession"));
const exerciseSession_1 = __importDefault(require("../models/exerciseSession"));
const exerciseSet_1 = __importDefault(require("../models/exerciseSet"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
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
router.get('/workout_session/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
     *         description: Internal Server Error
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
     *                   example: Internal Server Error
     */
    try {
        const user_id = req.params.user_id;
        const user = yield user_1.default.findById(user_id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        else {
            const sessions = user.workoutSessions;
            const fullSessions = [];
            for (let i = 0; i < sessions.length; i++) {
                const curr_sess = yield workoutSession_1.default.findById(sessions[i]).populate({
                    path: 'exercises',
                    populate: {
                        path: 'sets',
                    },
                });
                fullSessions.push(curr_sess);
            }
            res.status(200).json({ status: 'success', data: fullSessions });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err });
    }
}));
// CREATE
router.post('/workout_session/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_session/{user_id}:
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
     *                   type: object
     *                   description: Data related to the example workout
     *                   properties:
     *                     name:
     *                       type: string
     *                     exercises:
     *                       type: array
     *                       description: List of exercises in the workout session
     *                       items:
     *                         type: object
     *                         properties:
     *                           _id:
     *                             type: string
     *                             description: Unique ID of the exercise
     *                           name:
     *                             type: string
     *                             description: Name of the exercise
     *                           description:
     *                             type: string
     *                             description: Description of the exercise
     *                           icon:
     *                             type: string
     *                             description: URL of the exercise icon
     *                           muscleType:
     *                             type: string
     *                             description: Type of muscle targeted by the exercise
     *                           category:
     *                             type: string
     *                             description: Category of the exercise
     *                           sets:
     *                             type: array
     *                             description: List of sets for the exercise
     *                             items:
     *                               type: object
     *                               properties:
     *                                 _id:
     *                                   type: string
     *                                   description: Unique ID of the set
     *                                 setNum:
     *                                   type: integer
     *                                   description: Number of the set
     *                                 weight:
     *                                   type: number
     *                                   description: Weight used in the set
     *                                 duration:
     *                                   type: integer
     *                                   description: Duration of the set in seconds
     *                                 restTime:
     *                                   type: integer
     *                                   description: Rest time after the set in seconds
     *                     _id:
     *                       type: string
     *                       description: Unique ID of the workout session
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-02-29T19:51:05.748Z"
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-02-29T19:51:05.748Z"
     *
     *       '500':
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                 message:
     *                   type: string
     */
    try {
        const exercises = req.body.exercises;
        const exerciseIds = [];
        // Loop through exercises
        for (let i = 0; i < exercises.length; i++) {
            // create a new set
            const setIds = [];
            for (let j = 0; j < exercises[i]['sets'].length; j++) {
                const newSet = new exerciseSet_1.default(exercises[i]['sets'][j]);
                const set = yield newSet.save();
                setIds.push(set._id);
            }
            exercises[i]['sets'] = setIds;
            const newExercise = new exerciseSession_1.default(exercises[i]);
            // create a new exercise
            const exercise = yield newExercise.save();
            exerciseIds.push(exercise._id);
        }
        const insertObj = {
            name: req.body.name,
            exercises: exerciseIds,
        };
        // Create and save new workout session
        const newSession = new workoutSession_1.default(insertObj);
        const savedSession = yield newSession.save();
        const session = yield savedSession.populate({
            path: 'exercises',
            populate: {
                path: 'sets',
            },
        });
        // add new workoutSession to user's workoutSessions array
        const user = yield user_1.default.findById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        user.workoutSessions.push(savedSession._id);
        yield user.save();
        res.status(201).json({ status: 'success', data: session });
    }
    catch (err) {
        res.status(500).json({ status: 'error', message: err });
    }
}));
// UPDATE
router.put('/workout_session/:workout_session_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_session/{workout_session_id}:
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
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                 message:
     *                   type: string
     *             example:
     *               status: error
     *               message: Invalid request body
     *       '404':
     *         description: Workout session not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                 message:
     *                   type: string
     *             example:
     *               status: error
     *               message: Workout session not found
     *       '500':
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                 message:
     *                   type: string
     */
    try {
        console.log('Updating workout session...');
        const workoutSessionId = req.params.workout_session_id;
        const updateObj = req.body; // Assuming req.body contains the fields to update
        console.log(req.body);
        const exercises = req.body['exercises'];
        console.log(exercises);
        const exerciseIds = [];
        // Loop through exercises
        for (let i = 0; i < exercises.length; i++) {
            const newExercise = exercises[i];
            const exerciseId = exercises[i]._id;
            console.log('exerciseId', exerciseId);
            // update sets if needed
            for (let j = 0; j < newExercise['sets'].length; j++) {
                const exerciseSetId = newExercise['sets'][j]._id;
                console.log(exerciseSetId);
                const result = yield exerciseSet_1.default.findOneAndUpdate({ _id: exerciseSetId }, newExercise['sets'][j], { new: true });
                if (!result)
                    res.status(400).json({ status: 'error', message: 'Invalid Exercise Sets' });
                newExercise['sets'][j] = result;
                console.log(result);
            }
            exercises[i] = newExercise;
            const result = yield exerciseSession_1.default.findOneAndUpdate({ _id: exerciseId }, newExercise, {
                new: true,
            });
            console.log(result);
            if (!result)
                res.status(400).json({ status: 'error', message: 'Invalid Exercise Object' });
            exerciseIds.push(result === null || result === void 0 ? void 0 : result._id);
        }
        updateObj.exercises = exerciseIds;
        console.log(workoutSessionId);
        // Use { new: true } to return the modified document rather than the original
        const updatedSession = yield workoutSession_1.default.findOneAndUpdate({ _id: workoutSessionId }, updateObj, { new: true });
        const populatedSession = yield (updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.populate({
            path: 'exercises',
            populate: {
                path: 'sets',
            },
        }));
        if (updatedSession)
            res.status(200).json({ status: 'success', data: populatedSession });
        else
            res.status(400).json({ status: 'error', message: 'workout session not found' });
    }
    catch (err) {
        res.status(500).json({ status: 'error', message: err });
    }
}));
// DELETE
router.delete('/workout_session/:workout_session_id/user/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/workout_session/{workout_session_id}/user/{user_id}:
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
        const userId = req.params.user_id;
        const workoutSessionId = req.params.workout_session_id;
        const deletedSession = yield workoutSession_1.default.findOneAndDelete({ _id: workoutSessionId });
        if (!deletedSession) {
            return res.status(404).json({ message: 'Workout session not found' });
        }
        const result = yield user_1.default.updateOne({ _id: userId }, { $pull: { workoutSessions: workoutSessionId } });
        if (result.modifiedCount == 0) {
            return res.status(404).json({ message: 'User not found or workout session not associated with the user' });
        }
        res.status(200).send({ status: 'success', data: deletedSession });
    }
    catch (err) {
        res.status(500).json({ status: 'error', message: err });
    }
}));
exports.default = router;
