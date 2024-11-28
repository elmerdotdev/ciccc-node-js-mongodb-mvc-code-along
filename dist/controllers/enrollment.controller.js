"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const enrollment_model_1 = require("../models/enrollment.model");
// Get all enrollments
const getAllEnrollments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enrollments = yield enrollment_model_1.Enrollment.find().populate('studentId').populate('courseId');
        res.status(200).json(enrollments);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to get all enrollments' });
    }
});
// Get enrollments by student id
const getEnrollmentsByStudentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enrollments = yield enrollment_model_1.Enrollment.find({ studentId: req.params.id }).populate('courseId');
        res.status(200).json(enrollments);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to get student\'s enrolments' });
    }
});
// Enroll student into course
const enrollStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId } = req.body;
        const newEnrollment = yield enrollment_model_1.Enrollment.create({ studentId, courseId });
        res.status(201).json(newEnrollment);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to enroll student' });
    }
});
// Un-enroll student from course
const unenrollStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enrollment = yield enrollment_model_1.Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            res.status(404).json({ error: 'Enrollment not found' });
            return;
        }
        res.status(200).json({ message: 'Student un-enrolled' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to un-enroll student' });
    }
});
exports.default = {
    getAllEnrollments,
    getEnrollmentsByStudentId,
    enrollStudent,
    unenrollStudent
};
