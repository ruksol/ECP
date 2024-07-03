const IndustryNews = require('../models/IndustryNews');

exports.getAllNews = async (req, res) => {
  try {
    const news = await IndustryNews.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await IndustryNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNews = async (req, res) => {
  const news = new IndustryNews({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: req.body.author,
    publishedAt: new Date(),
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await IndustryNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    news.title = req.body.title || news.title;
    news.content = req.body.content || news.content;
    news.category = req.body.category || news.category;
    news.author = req.body.author || news.author;
    news.updatedAt = Date.now();

    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const result = await IndustryNews.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json({ message: 'News article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};