import { Request, Response } from "express";
import { Course, ICourse } from "../models/course.model";

// Get all courses
const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
    res.status(200).json(courses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to get all courses' })
  }
}

// Get course by id
const getCourseById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      res.status(404).json({ error: 'Course does not exist' })
      return
    }
    res.status(200).json(course)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to get course by id' })
  }
}

// Add new course
const addCourse = async (req: Request<{}, {}, ICourse>, res: Response) => {
  try {
    const newCourse = await Course.create(req.body)
    res.status(201).json(newCourse)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Unable to add course" })
  }
}

// Update course by id
const updateCourseById = async (req: Request<{ id: string }, {}, Partial<ICourse>>, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!course) {
      res.status(404).json({ error: 'Course not found' })
      return
    }
    res.status(200).json(course)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to update course' })
  } 
}

// Delete course by id
const deleteCourseById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      res.status(404).json({ error: 'Course not found' })
      return
    }
    res.status(200).json({ message: 'Course deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Unable to delete course' })
  }
}

export default {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById
}