import express, { Request, Response, NextFunction} from 'express';
import User from '../models/user';

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
router.get('/user/:user_id', (req: Request, res: Response, next: NextFunction) => {
    
    res.status(200).send(dummy_data);
});

// CREATE
router.post('/user/:user_id', (req: Request, res: Response, next: NextFunction) => {
    
    res.status(200).send({status: "success", data: dummy_data});
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