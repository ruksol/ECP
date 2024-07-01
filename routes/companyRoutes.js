const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');
const { rbacMiddleware, ROLES } = require('../middleware/rbacMiddleware');

router.use(authMiddleware);

// Get all companies (accessible to all authenticated users)
router.get('/', companyController.getAllCompanies);

// Get company by ID (accessible to all authenticated users)
router.get('/:id', companyController.getCompanyById);

// Create a new company (accessible to users with 'admin' or 'manager' role)
router.post('/', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), companyController.createCompany);

// Update a company (accessible to users with 'admin' or 'manager' role)
router.patch('/:id', rbacMiddleware([ROLES.ADMIN, ROLES.MANAGER]), companyController.updateCompany);

// Delete a company (accessible to users with 'admin' role)
router.delete('/:id', rbacMiddleware([ROLES.ADMIN]), companyController.deleteCompany);

module.exports = router;