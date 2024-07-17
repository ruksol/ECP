// tenderRoutes.js
const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');
const authMiddleware = require('../middleware/authMiddleware');
const { rbacMiddleware, ROLES } = require('../middleware/rbacMiddleware');

router.use(authMiddleware);

// Get all tenders (accessible to all authenticated users)
router.get('/', tenderController.getAllTenders);

// Get tender by ID (accessible to all authenticated users)
router.get('/:id', tenderController.getTenderById);

// Create a new tender (accessible to users with 'admin' or 'manager' role)
router.post('/', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), tenderController.createTender);

// Update a tender (accessible to users with 'admin' or 'manager' role)
router.put('/:id', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), tenderController.updateTender);

// Delete a tender (accessible to users with 'admin' role)
router.delete('/:id', rbacMiddleware([ROLES.ADMIN]), tenderController.deleteTender);

module.exports = router;