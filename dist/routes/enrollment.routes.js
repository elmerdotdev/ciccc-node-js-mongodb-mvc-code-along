"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollment_controller_1 = __importDefault(require("../controllers/enrollment.controller"));
const enrollmentRouter = (0, express_1.Router)();
// Routes
enrollmentRouter.delete('/unenroll/:id', enrollment_controller_1.default.unenrollStudent);
enrollmentRouter.get('/', enrollment_controller_1.default.getAllEnrollments);
enrollmentRouter.get('/student/:id', enrollment_controller_1.default.getEnrollmentsByStudentId);
enrollmentRouter.post('/', enrollment_controller_1.default.enrollStudent);
exports.default = enrollmentRouter;
