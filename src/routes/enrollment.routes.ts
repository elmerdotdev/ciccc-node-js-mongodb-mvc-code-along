import { Router } from "express";
import enrollmentController from "../controllers/enrollment.controller";

const enrollmentRouter = Router()

// Routes
enrollmentRouter.delete('/unenroll/:id', enrollmentController.unenrollStudent)
enrollmentRouter.get('/', enrollmentController.getAllEnrollments)
enrollmentRouter.get('/student/:id', enrollmentController.getEnrollmentsByStudentId)
enrollmentRouter.post('/', enrollmentController.enrollStudent)

export default enrollmentRouter