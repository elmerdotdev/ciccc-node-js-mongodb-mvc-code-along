"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const enrollment_routes_1 = __importDefault(require("./routes/enrollment.routes"));
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/students', student_routes_1.default);
app.use('/api/courses', course_routes_1.default);
app.use('/api/enrollments', enrollment_routes_1.default);
// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DATABASE_URL;
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
})
    .catch((err) => {
    console.error(`Failed to connect to database: ${err}`);
});
