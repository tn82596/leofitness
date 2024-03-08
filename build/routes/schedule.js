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
router.get('/schedule/user/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const user = yield user_1.default.findById(user_id).populate({
            path: 'schedule',
            populate: { path: 'workoutPlans', model: 'WorkoutPlan' }
        });
        if (!user)
            return res.status(404).json({ status: 'error', message: 'User not found' });
        res.status(200).json({ status: 'success', data: user.schedule });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// Get a schedule by schedule id
router.get('/schedule/:schedule_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scheduleId = req.params.schedule_id;
        const schedule = yield schedule_1.default.findById(scheduleId)
            .populate({
            path: 'workoutPlans',
            model: 'WorkoutPlan',
        });
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json({ status: 'success', data: schedule });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// Create a new schedule and update the schedule field
router.post('/schedule/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertObj = req.body;
        if (insertObj.hasOwnProperty('workoutPlans')) {
            const workoutPlans = req.body.workoutPlans;
            const existingWorkoutPlans = yield workoutPlan_1.default.find({ _id: { $in: workoutPlans } });
            if (existingWorkoutPlans.length !== workoutPlans.length) {
                return res.status(404).json({ message: 'One or more workout plans not found' });
            }
        }
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
    try {
        const updateObj = req.body;
        if (updateObj.hasOwnProperty('workoutPlans')) {
            const workoutPlans = req.body.workoutPlans;
            const existingWorkoutPlans = yield workoutPlan_1.default.find({ _id: { $in: workoutPlans } });
            if (existingWorkoutPlans.length !== workoutPlans.length) {
                return res.status(404).json({ message: 'One or more workout plans not found' });
            }
        }
        const scheduleId = req.params.schedule_id;
        const updatedSchedule = yield workoutPlan_1.default.findByIdAndUpdate(scheduleId, updateObj, {
            new: true,
        });
        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json({ message: 'Schedule updated successfully', data: updatedSchedule });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// DELETE
router.delete('/schedule/:schedule_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
