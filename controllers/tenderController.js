const Tender = require('../models/Tender');

exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.find().populate('createdBy', 'name');
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTenderById = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id).populate('createdBy', 'name');
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }
    res.json(tender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTender = async (req, res) => {
  const tender = new Tender({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline,
    budget: req.body.budget,
    status: 'Open',
    createdBy: req.user.id, // Assuming you have authentication middleware that sets req.user
  });

  try {
    const newTender = await tender.save();
    res.status(201).json(newTender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    tender.title = req.body.title || tender.title;
    tender.description = req.body.description || tender.description;
    tender.category = req.body.category || tender.category;
    tender.deadline = req.body.deadline || tender.deadline;
    tender.budget = req.body.budget || tender.budget;
    tender.status = req.body.status || tender.status;
    tender.updatedAt = Date.now();

    const updatedTender = await tender.save();
    res.json(updatedTender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// exports.deleteTender = async (req, res) => {
//   try {
//     const tender = await Tender.findById(req.params.id);
//     if (!tender) {
//       return res.status(404).json({ message: 'Tender not found' });
//     }
//     await tender.remove();
//     res.json({ message: 'Tender deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.deleteTender = async (req, res) => {
  try {
    const result = await Tender.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Tender not found' });
    }
    res.json({ message: 'Tender deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};