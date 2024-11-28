import { Request, Response } from 'express'
import { Enrollment } from '../models/enrollment.model'

// Get all enrollments
const getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await Enrollment.find().populate('studentId').populate('courseId')
    res.status(200).json(enrollments)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to get all enrollments' })
  }
}

// Get enrollments by student id
const getEnrollmentsByStudentId = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.id }).populate('courseId')
    res.status(200).json(enrollments)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to get student\'s enrolments' })
  }
}

// Enroll student into course
const enrollStudent = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.body
    const newEnrollment = await Enrollment.create({ studentId, courseId })
    res.status(201).json(newEnrollment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to enroll student' })
  }
}

// Un-enroll student from course
const unenrollStudent = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id)
    if (!enrollment) {
      res.status(404).json({ error: 'Enrollment not found' })
      return
    }
    res.status(200).json({ message: 'Student un-enrolled' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to un-enroll student' })
  }
}

export default {
  getAllEnrollments,
  getEnrollmentsByStudentId,
  enrollStudent,
  unenrollStudent
}