const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://frontendtask-m4f3irm3r-supriyad12s-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Your routes
app.use('/auth', require('./routes/auth'));

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
