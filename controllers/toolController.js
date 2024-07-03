const Tool = require('../models/Tool');

exports.getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find().populate('supplier', 'name');
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id).populate('supplier', 'name');
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTool = async (req, res) => {
  const tool = new Tool({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    supplier: req.body.supplier,
  });

  try {
    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTool = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    tool.name = req.body.name || tool.name;
    tool.description = req.body.description || tool.description;
    tool.category = req.body.category || tool.category;
    tool.price = req.body.price || tool.price;
    tool.supplier = req.body.supplier || tool.supplier;
    tool.updatedAt = Date.now();

    const updatedTool = await tool.save();
    res.json(updatedTool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const result = await Tool.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json({ message: 'Tool deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};