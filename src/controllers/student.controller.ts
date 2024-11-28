import { Request, Response } from 'express'
import { Student } from '../models/student.model'

// Get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find()
    res.status(200).json(students)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to get all students' })
  }
}

// Get student by id
const getStudentById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      res.status(404).json({ error: 'Student does not exist' })
      return
    }
    res.status(200).json(student)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to get student by id' })
  }
}

// Get student by name
const getStudentByName = async (req: Request<{}, {}, {}, { firstname: string }>, res: Response) => {
  try {
    const { firstname } = req.query
    const student = await Student.find({ firstname: { $regex: firstname, $options: 'i' }})
    if (!student) {
      res.status(404).json({ error: 'Student not found' })
      return
    }
    res.status(200).json(student)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to get student by name' })
  }
}

// Add new student
const addStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await Student.create(req.body)
    res.status(201).json(newStudent)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to add student' })
  }
}

// Update student by id
const updateStudentById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true // returns the updated data
    })
    if (!student) {
      res.status(404).json({ error: 'Student does not exist' })
      return
    }
    res.status(200).json(student)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to update student' })
  }
}

// Delete student by id
const deleteStudentById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      res.status(404).json({ error: 'Student does not exist' })
      return
    }
    res.status(200).json({ message: 'Student deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to delete student' })
  }
}

export default {
  getAllStudents,
  getStudentById,
  getStudentByName,
  addStudent,
  updateStudentById,
  deleteStudentById
}