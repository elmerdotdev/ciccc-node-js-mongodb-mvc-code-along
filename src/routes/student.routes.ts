import { Router } from "express";
import studentController from "../controllers/student.controller";

const studentRouter = Router()

// Routes
studentRouter.get('/', studentController.getAllStudents)
studentRouter.get('/search', studentController.getStudentByName)
studentRouter.get('/:id', studentController.getStudentById)
studentRouter.post('/', studentController.addStudent)
studentRouter.put('/:id', studentController.updateStudentById)
studentRouter.delete('/:id', studentController.deleteStudentById)

export default studentRouter