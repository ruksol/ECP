const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCompany = async (req, res) => {
  const company = new Company({
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    website: req.body.website,
    category: req.body.category,
    image: req.body.image, // Include image in creation
  });

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.name = req.body.name || company.name;
    company.description = req.body.description || company.description;
    company.email = req.body.email || company.email;
    company.phone = req.body.phone || company.phone;
    company.address = req.body.address || company.address;
    company.website = req.body.website || company.website;
    company.category = req.body.category || company.category;
    company.image = req.body.image || company.image; // Update image if provided
    company.updatedAt = Date.now();

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const result = await Company.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
