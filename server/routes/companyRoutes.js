import express, { Router } from 'express';
import multer from 'multer';
import {registerCompany,loginCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs, changeJobApplicationsStatus, changeVisibility } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import  protectCompany  from '../middleware/authMiddleware.js';
 const router=express.Router();

 //Register a company
 router.post('/register',upload.single('image'),registerCompany);

 //Company Login
 router.post('/login',loginCompany);
  

//Get Company data
router.get('/company', protectCompany, getCompanyData);
 
//Post a job
router.post('/post-job',protectCompany,postJob);

//Get Applicaants Data of Company
router.get('/applicants',protectCompany,getCompanyJobApplicants);
 
//Get Comapny job List
router.get('/list-job',protectCompany,getCompanyPostedJobs);

 //Change Applications status 
 router.post('/change-status',protectCompany,changeJobApplicationsStatus);

 //Change Applications Visibility
 router.post('/change-visiblity',protectCompany,changeVisibility);

 export  default router;