// toolRoutes.js
const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const authMiddleware = require('../middleware/authMiddleware');
const { rbacMiddleware, ROLES } = require('../middleware/rbacMiddleware');

router.use(authMiddleware);

// Get all tools (accessible to all authenticated users)
router.get('/', toolController.getAllTools);

// Get tool by ID (accessible to all authenticated users)
router.get('/:id', toolController.getToolById);

// Create a new tool (accessible to users with 'admin' or 'manager' role)
router.post('/', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), toolController.createTool);

// Update a tool (accessible to users with 'admin' or 'manager' role)
router.put('/:id', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), toolController.updateTool);

// Delete a tool (accessible to users with 'admin' role)
router.delete('/:id', rbacMiddleware([ROLES.ADMIN]), toolController.deleteTool);

module.exports = router;