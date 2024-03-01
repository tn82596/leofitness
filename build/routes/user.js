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
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
// GET
router.get('/user/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/user/{user_id}:
     *   get:
     *     tags:
     *       - User
     *     summary: Retrieve a user by ID
     *     description: Retrieve user information based on the provided user ID.
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to retrieve.
     *     responses:
     *       '200':
     *         description: A successful response with the user information.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (success).
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       '404':
     *         description: User not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (error).
     *                 message:
     *                   type: string
     *                   description: Error message indicating that the user was not found.
     */
    try {
        const user_id = req.params.user_id;
        const user = yield user_1.default.findById(user_id);
        if (!user)
            return res.status(404).json({ status: 'error', message: 'User not found' });
        res.status(200).json({ status: 'success', data: user });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// CREATE
router.post('/user', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/user:
     *   post:
     *     tags:
     *       - User
     *     summary: Create a new user
     *     description: Create a new user with the provided user data.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       '200':
     *         description: A successful response with the created user data.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (success).
     *                 data:
     *                   $ref: '#/components/schemas/User'
     */
    try {
        const user_data = req.body;
        const new_user = new user_1.default(user_data);
        const saved_user = yield new_user.save();
        res.status(200).send({ status: 'success', data: saved_user });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// UPDATE
router.put('/user/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/user/{user_id}:
     *   put:
     *     tags:
     *       - User
     *     summary: Update a user by ID
     *     description: Update user information based on the provided user ID.
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       '200':
     *         description: A successful response with the updated user data.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (success).
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       '404':
     *         description: User not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (error).
     *                 message:
     *                   type: string
     *                   description: Error message indicating that the user was not found.
     */
    try {
        const user_id = req.params.user_id;
        const updated_data = req.body;
        const updated_user = yield user_1.default.findByIdAndUpdate(user_id, updated_data, { new: true });
        if (!updated_user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.status(200).json({ status: 'success', data: updated_user });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// DELETE
router.delete('/user/:user_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @openapi
     * /api/user/{user_id}:
     *   delete:
     *     tags:
     *       - User
     *     summary: Delete a user by ID
     *     description: Delete a user based on the provided user ID.
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to delete.
     *     responses:
     *       '200':
     *         description: A successful response indicating that the user was deleted.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (success).
     *                 message:
     *                   type: string
     *                   description: Success message indicating that the user was deleted.
     *       '404':
     *         description: User not found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: Status of the response (error).
     *                 message:
     *                   type: string
     *                   description: Error message indicating that the user was not found.
     */
    try {
        const user_id = req.params.user_id;
        const deleted_user = yield user_1.default.findByIdAndDelete(user_id);
        if (!deleted_user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.status(200).json({ status: 'error', message: 'User successfully deleted' });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
exports.default = router;
