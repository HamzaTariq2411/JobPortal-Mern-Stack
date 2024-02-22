import express from "express";
import jobController from "../controllers/job/jobController.js";
import getJobController from "../controllers/job/getJobsController.js";
import { isAuthorize } from "../middlewares/auth.js";
import getmyJobsController from "../controllers/job/getmyjobController.js";
import updateJobsController from "../controllers/job/updateJobsController.js";
import deleteJobController from "../controllers/job/deletejobController.js";
import getSingleJob from "../controllers/job/getSingleJob.js";

const router = express.Router();

router.route("/postjob").post(isAuthorize, jobController);
router.route("/getjobs").get(getJobController);
router.route("/getmyjobs").get(isAuthorize, getmyJobsController);
router.route("/updatejobs/:id").put(isAuthorize, updateJobsController);
router.route("/deletejobs/:id").delete(isAuthorize,  deleteJobController);
router.route("/job/:id").get(isAuthorize,  getSingleJob);





export default router;
