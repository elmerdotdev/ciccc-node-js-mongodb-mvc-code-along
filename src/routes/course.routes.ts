import { Router } from "express";
import courseController from "../controllers/course.controller";

const courseRouter = Router()

// Routes
courseRouter.get('/', courseController.getAllCourses)
courseRouter.get('/:id', courseController.getCourseById)
courseRouter.post('/', courseController.addCourse)
courseRouter.put('/:id', courseController.updateCourseById)
courseRouter.delete('/:id', courseController.deleteCourseById)

export default courseRouter