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
// Create a new workout plan and update the user's workoutPlans array
router.post('/schedule/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            name: req.body.name,
            category: req.body.category,
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
exports.default = router;
