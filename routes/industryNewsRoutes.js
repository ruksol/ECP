// industryNewsRoutes.js
const express = require('express');
const router = express.Router();
const industryNewsController = require('../controllers/industryNewsController');
const authMiddleware = require('../middleware/authMiddleware');
const { rbacMiddleware, ROLES } = require('../middleware/rbacMiddleware');

router.use(authMiddleware);

// Get all news (accessible to all authenticated users)
router.get('/', industryNewsController.getAllNews);

// Get news by ID (accessible to all authenticated users)
router.get('/:id', industryNewsController.getNewsById);

// Create a new news (accessible to users with 'admin' or 'manager' role)
router.post('/', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), industryNewsController.createNews);

// Update a news (accessible to users with 'admin' or 'manager' role)
router.put('/:id', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), industryNewsController.updateNews);

// Delete a news (accessible to users with 'admin' role)
router.delete('/:id', rbacMiddleware([ROLES.ADMIN]), industryNewsController.deleteNews);

module.exports = router;