const router = require('express').Router();
const controller = require('../controllers/studentController');

router.get('/', controller.getStudents);
router.get('/:id', controller.getStudentByID);
router.post('/', controller.createStudent);
router.delete('/:id', controller.deleteStudent);
router.put('/:id', controller.updateStudent);

module.exports = router;