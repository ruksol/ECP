const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const { rbacMiddleware, ROLES } = require('../middleware/rbacMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.use(authMiddleware);

// Get all users (accessible to users with 'admin' role)
router.get('/', rbacMiddleware([ROLES.ADMIN]), userController.getAllUsers);

// Get user by ID (accessible to all authenticated users)
router.get('/:id', userController.getUserById);

// Create a new user (accessible to users with 'admin' role)
router.post('/', rbacMiddleware([ROLES.ADMIN]), userController.createUser);

// Update a user (accessible to users with 'admin' role)
router.put('/:id', rbacMiddleware([ROLES.ADMIN]), userController.updateUser);

// Delete a user (accessible to users with 'admin' role)
router.delete('/:id', rbacMiddleware([ROLES.ADMIN]), userController.deleteUser);

module.exports = router;