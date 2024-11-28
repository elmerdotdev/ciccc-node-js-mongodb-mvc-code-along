"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
const studentRouter = (0, express_1.Router)();
// Routes
studentRouter.get('/', student_controller_1.default.getAllStudents);
studentRouter.get('/search', student_controller_1.default.getStudentByName);
studentRouter.get('/:id', student_controller_1.default.getStudentById);
studentRouter.post('/', student_controller_1.default.addStudent);
studentRouter.put('/:id', student_controller_1.default.updateStudentById);
studentRouter.delete('/:id', student_controller_1.default.deleteStudentById);
exports.default = studentRouter;
