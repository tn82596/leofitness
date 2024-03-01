import express, { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';

const router = express.Router();

// GET
router.get('/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
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
router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user_data: IUser = req.body;
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
	try {
		const user_id = req.params.user_id;
		const deleted_user = await User.findByIdAndDelete(user_id);

		if (!deleted_user) {
			return res.status(404).json({ status: 'error', message: 'User not found' });
		}
		return res.status(200).json({ status: 'error', message: 'User successfully deleted' });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

export default router;
