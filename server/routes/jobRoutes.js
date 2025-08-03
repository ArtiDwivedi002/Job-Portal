import express from 'express'
import { getJobs,getJobById } from '../controllers/jobController.js';
 
const router=express.Router();

//Routes to get all Jobs Data
router.get('/',getJobs);



//Route to get a single job by Id
router.get('/:id',getJobById);

export default router;