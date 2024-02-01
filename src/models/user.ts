import mongoose, { Schema, Document } from 'mongoose';
import workoutPlan, { IWorkoutPlan } from './workoutPlan'; 

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    date: Date;
    bio: string;
    picture: string;
    workoutPlans: Types.ObjectId[] | IWorkoutPlan[];
}

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    bio: { type: String },
    picture: { type: String },
    workoutPlans: [{ type: Schema.Types.ObjectId, ref: 'WorkoutPlan' }],
});

const user = mongoose.model<IUser>('user', userSchema);

export default user;

