import express from 'express'
import jobseekerGetApplicationController from '../controllers/application/jobseekerGetApplicationController.js';
import employerGetApplicationController from '../controllers/application/employerGetApplicationController.js';
import { isAuthorize } from '../middlewares/auth.js';
import postApplicationController from '../controllers/application/postApplicationController.js';
import { upload } from '../middlewares/uploadCV.js';


const router = express.Router();


router.route("/jobSeeker/getAll").get(isAuthorize,jobseekerGetApplicationController)
router.route("/employer/getAll").get(isAuthorize,employerGetApplicationController)
router.route("/postapplication").post(isAuthorize,upload.single("resume") ,postApplicationController)



export default router;