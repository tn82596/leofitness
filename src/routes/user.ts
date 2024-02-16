import express, { Request, Response, NextFunction} from 'express';
import User, { IUser } from '../models/user';

const dummy_data = {
	firstName: 'James',
    lastName: 'White',
    fullName: 'James White',
    email: 'jameswhite@gmail.com',
    date: '02/05/2024',
    bio: 'I like to workout',
};

const router = express.Router();

// GET
router.get('/user/:user_id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findById(user_id);
        if (!user)
            return res.status(404).json({ status: 'error', message: 'User not found' });

        res.status(200).json({ status: 'success', data: user});
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch user'});
    }
});

// CREATE
router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_data: IUser = req.body;
        const new_user = new User(user_data);
        const saved_user = await new_user.save();
        res.status(200).send({status: "success", data: saved_user});
    } catch (error) {
        res.status(500).json({ status: 'error', data: req.body });
    }
});

// UPDATE
router.put('/user/:user_id', (req: Request, res: Response, next: NextFunction) => {
    
    res.status(200).send({ status: 'success', data: dummy_data });
});

// DELETE
router.delete('/user/:user_id', (req: Request, res: Response, next: NextFunction) => {
    
    res.status(200).send({ status: 'success', data: dummy_data });
});

export default router;