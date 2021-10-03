const express = require("express");
const router = express.Router();
const ADMIN = process.env.ADMIN;
const courseController = require("../controller/courseController");
const {authRole} = require('../controller/authentication/auth');
const isAuthForDeleteCourse = require("../middleware/courseDeleteAccess")

router.get('/',authRole(ADMIN), courseController.getAllCourses);
router.post('/addNewCourse', authRole(ADMIN), courseController.addNewCourse);
router.get('/search',authRole(ADMIN), courseController.searchCourseAutocomplete);
router.get('/getCourseById/:id', courseController.getCourseById);
router.delete('/deleteSubSubject', authRole(ADMIN), courseController.deleteSubSubject);
router.post('/', authRole(ADMIN), courseController.addNewCourse);
router.post('/addSubSubject', authRole(ADMIN), courseController.addSubSubject);
router.put('/updateSubSubject', authRole(ADMIN), courseController.updateSubSubject);
router.put('/updateSubject', authRole(ADMIN), courseController.updateSubject);
router.get('/students/:id',courseController.getStudentsByCourse);
router.delete('/deleteCourseById/:id', authRole(ADMIN), isAuthForDeleteCourse, courseController.deleteCourseById);

module.exports = router;