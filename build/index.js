"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import mongoose from 'mongoose';
const workoutSession_1 = __importDefault(require("./routes/workoutSession"));
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    // res.send('Server up (updated for testing w/ EB)!');
    // For testing
    res.send(`Server up! With MongoDB URI: "${process.env.MONGODB_URI || 'none'}"`);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    (0, swagger_1.default)(app);
});
// const uri = process.env.MONGODB_URI || '';
// connect to mongodb database
// mongoose
// 	.connect(uri)
// 	.then(() => {
// 		console.log('Successfully connected to MongoDB!');
// 	})
// 	.catch((err: mongoose.Error) => {
// 		mongoose.disconnect();
// 		console.log('Failed to connect to MongoDB');
// 		console.log(`Error: ${err}`);
// 	});
app.use('/api/', workoutSession_1.default);
// node build/index.js
