const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
  bulkComplete,
  bulkDelete,
  bulkCategory,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// Bulk operations (defined before /:id routes to prevent parameter conflict)
router.post('/bulk/complete', bulkComplete);
router.post('/bulk/delete', bulkDelete);
router.post('/bulk/category', bulkCategory);

// Standard CRUD operations
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/complete', toggleComplete);

module.exports = router;
