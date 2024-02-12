import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import { config } from 'dotenv';
const app = express();
config({
  path:'./.env'
})
const PORT = process.env.PORT || 3000;
import About  from  './Router/about.js' 
import Testimonials from './Router/testimonials.js';
import Gallery from './Router/gallery.js';
import Home from './Router/home.js'
import Contact from './Router/contact.js';
import Services from './Router/services.js'
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
app.use('/services', Services)






app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username != process.env.uname && password !== process.env.password ){
    return res.status(401).send('Invalid username or password.');
  }

  const token = jwt.sign({ username: process.env.uname }, process.env.token, {
    expiresIn: '30d',
  });
  console.log(token)

  res.json({ token });
});


// Start the server
mongoose.connect(process.env.DB).then(
  app.listen(PORT, () => {
    console.log('Mongodb connected')
    console.log(`Server is running on http://localhost:${PORT}`);
  }) 
)
