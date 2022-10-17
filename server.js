const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
require('dotenv').config();
const methodOverride = require('method-override');
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const Article = require('./models/article');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/article', articleRouter);
app.get('/', async (req, res) => {
  const articles = await Article.find({}).sort({ createAt: 'desc' });
  res.render('articles/index', { articles: articles });
});

app.listen(5000, () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected on port 5000'));
});
