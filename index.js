const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/inventory', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('docs'));

// Set up the Item model
const Item = mongoose.model('Item', {
  name: String,
  category: String,
  quantity: Number,
  price: Number,
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/docs');
});

app.post('/addItem', async (req, res) => {
  const { name, category, quantity, price } = req.body;

  const newItem = new Item({
    name,
    category,
    quantity,
    price,
  });

  try {
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/viewItems', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
