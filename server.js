const express = require('express');
const cors = require('cors');

const app = express();

// Allow all origins (or restrict to your frontend)
app.use(cors({
  origin: 'https://smart-task-manager-event-vark.vercel.app', // frontend URL
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use(express.json());

// Your routes here
app.use('/auth', require('./routes/auth'));

// Start server (for serverless, export app)
module.exports = app;
