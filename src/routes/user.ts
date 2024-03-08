import express, { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';

const router = express.Router();

// GET
router.get('/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @openapi
 * /user/{user_id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by ID
 *     description: Retrieve a user based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: A successful response with the user data.
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
 *                       description: The unique identifier of the user.
 *                       example: 65ea90464f0b59684764731a
 *                     firstName:
 *                       type: string
 *                       description: The first name of the user.
 *                       example: James
 *                     lastName:
 *                       type: string
 *                       description: The last name of the user.
 *                       example: Smith
 *                     fullName:
 *                       type: string
 *                       description: The full name of the user.
 *                       example: James Smith
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: jamessmith@gmail.com
 *                     bio:
 *                       type: string
 *                       description: The biography of the user.
 *                       example: I love working out
 *                     picture:
 *                       type: string
 *                       description: The picture URL of the user.
 *                       example: img.png
 *                     workoutPlans:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: An array of workout plan IDs associated with the user.
 *                       example: ["65ea90c14f0b596847647320", "65ea92b94f0b59684764732f"]
 *                     workoutSessions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: An array of workout session IDs associated with the user.
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp indicating when the user was created.
 *                       example: 2024-03-08T04:12:54.841Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp indicating when the user was last updated.
 *                       example: 2024-03-08T05:03:51.851Z
 *                     __v:
 *                       type: integer
 *                       description: The version of the user document.
 *                       example: 2
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
		const user_id = req.params.user_id;
		const user = await User.findById(user_id);
		if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

		res.status(200).json({ status: 'success', data: user });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// CREATE
router.post('/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @openapi
 * /user:
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
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *                 example: James
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *                 example: Smith
 *               fullName:
 *                 type: string
 *                 description: The full name of the user.
 *                 example: James Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: jamessmith@gmail.com
 *               bio:
 *                 type: string
 *                 description: The biography of the user.
 *                 example: I like working out
 *               picture:
 *                 type: string
 *                 description: The picture URL of the user.
 *                 example: img.png
 *     responses:
 *       '200':
 *         description: Successfully created a new user
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
 *                     firstName:
 *                       type: string
 *                       example: James
 *                     lastName:
 *                       type: string
 *                       example: Smith
 *                     fullName:
 *                       type: string
 *                       example: James Smith
 *                     email:
 *                       type: string
 *                       example: jamessmith@gmail.com
 *                     bio:
 *                       type: string
 *                       example: I like working out
 *                     picture:
 *                       type: string
 *                       example: img.png
 *                     workoutPlans:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     workoutSessions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     _id:
 *                       type: string
 *                       example: 65ea90464f0b59684764731a
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-03-08T04:12:54.841Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-03-08T04:12:54.841Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 */
	try {
		const user_data: IUser = req.body;
		user_data._id = req.params.user_id;

		const new_user = new User(user_data);
		const saved_user = await new_user.save();
		res.status(200).send({ status: 'success', data: saved_user });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// UPDATE
router.put('/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @openapi
 * /user/{user_id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user by ID
 *     description: Update user details based on the provided user ID and updated data.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 description: The updated biography of the user.
 *                 example: I really enjoy working out!!!
 *               picture:
 *                 type: string
 *                 description: The updated picture URL of the user.
 *                 example: img2.png
 *     responses:
 *       '200':
 *         description: Successfully updated the user
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
 *                       description: The unique identifier of the user.
 *                       example: 65ea90464f0b59684764731a
 *                     firstName:
 *                       type: string
 *                       description: The first name of the user.
 *                       example: James
 *                     lastName:
 *                       type: string
 *                       description: The last name of the user.
 *                       example: Smith
 *                     fullName:
 *                       type: string
 *                       description: The full name of the user.
 *                       example: James Smith
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: jamessmith@gmail.com
 *                     bio:
 *                       type: string
 *                       description: The updated biography of the user.
 *                       example: I really enjoy working out!!!
 *                     picture:
 *                       type: string
 *                       description: The updated picture URL of the user.
 *                       example: img2.png
 *                     workoutPlans:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: An array of workout plan IDs associated with the user.
 *                       example: ["65ea90c14f0b596847647320", "65ea92b94f0b59684764732f"]
 *                     workoutSessions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: An array of workout session IDs associated with the user.
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp indicating when the user was created.
 *                       example: 2024-03-08T04:12:54.841Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp indicating when the user was last updated.
 *                       example: 2024-03-08T14:58:28.794Z
 *                     __v:
 *                       type: integer
 *                       description: The version of the user document.
 *                       example: 2
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
		const user_id = req.params.user_id;
		const updated_data = req.body;
		const updated_user = await User.findByIdAndUpdate(user_id, updated_data, { new: true });

		if (!updated_user) {
			return res.status(404).json({ status: 'error', message: 'User not found' });
		}
		return res.status(200).json({ status: 'success', data: updated_user });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// DELETE
router.delete('/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
/**
 * @openapi
 * /user/{user_id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete user by ID
 *     description: Delete a user based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to be deleted.
 *     responses:
 *       '200':
 *         description: Successfully deleted the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User successfully deleted
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
		const user_id = req.params.user_id;
		const deleted_user = await User.findByIdAndDelete(user_id);

		if (!deleted_user) {
			return res.status(404).json({ status: 'error', message: 'User not found' });
		}
		return res.status(200).json({ status: 'success', message: 'User successfully deleted' });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

export default router;
