const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const Clothing = require('./models/Clothing');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/topcarefashion', { useNewUrlParser: true, useUnifiedTopology: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  const newClothing = new Clothing({ filename: req.file.filename, category: 'unknown' });
  await newClothing.save();
  res.json({ filename: req.file.filename });
});

app.post('/update-category', async (req, res) => {
  const { filename, category } = req.body;
  await Clothing.findOneAndUpdate({ filename }, { category });
  res.json({ message: 'Category updated successfully' });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
