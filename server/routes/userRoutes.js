import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';

const router=express.Router();
 

// Get User Data
router.get('/user',getUserData);

//Apply for a job
router.post('/post',applyForJob);

//Get Applied job data
router.get('/applications',getUserJobApplications);

//Update user Resume
router.post('/update-resume',upload.single('resume'),updateUserResume);
export default router;