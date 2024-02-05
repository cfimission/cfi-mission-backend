import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3000;
import About  from  './Router/about.js' 
import Testimonials from './Router/testimonials.js';
import Gallery from './Router/gallery.js';
import Home from './Router/home.js'
import Contact from './Router/contact.js';
mongoose.connect('mongodb://localhost:27017/mydatabase');
app.use(cors())
const User = mongoose.model('User', {
  username: String,
  password: String,
});

app.use(express.json());


app.use('/about',About)
app.use('/testimonials',Testimonials)
app.use('/gallery', Gallery)
app.use('/home', Home)
app.use('/contact', Contact)





app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username != "hazrath" && password !== 'hazrath' ){
    return res.status(401).send('Invalid username or password.');
  }

  const token = jwt.sign({ username: 'hazrath' }, 'nmdndsjdsjhsdhjsdjhhjdshjsdjjhds', {
    expiresIn: '30d',
  });
  console.log(token)

  res.json({ token });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
