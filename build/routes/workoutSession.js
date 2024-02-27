"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const dummy_data = {
    name: 'bench press',
    description: 'sit on bench and push heavy circle',
    icon: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fworld-us-canada-37493165&psig=AOvVaw2qm3bu5JC-rWltqZWtXRiF&ust=1706904020436000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKD38JD3ioQDFQAAAAAdAAAAABAD',
    muscle_type: 'chest',
    sets: 2,
    weight: 225,
    rest_time: 100,
    intensity: 'high',
};
// GET
router.get('/workout_session/:user_id', (req, res, next) => {
    // TODO: get workout session using user id
    res.status(200).send([dummy_data, dummy_data]);
});
// CREATE
router.post('/workout_session/:workout_session_id', (req, res, next) => {
    // TODO: create an insert a new workout session
    res.status(200).send({ status: 'success', data: dummy_data });
});
// UPDATE
router.put('/workout_session/:workout_session_id', (req, res, next) => {
    res.status(200).send({ status: 'success', data: dummy_data });
});
// DELETE
router.delete('/workout_session/:workout_session_id', (req, res, next) => {
    res.status(200).send({ status: 'success', data: dummy_data });
});
exports.default = router;
