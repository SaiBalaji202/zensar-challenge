const express = require('express');
const connectToDB = require('./config/db');

const app = express();
// Connect to DB
connectToDB();

// Middlewares
app.use(express.json({ extended: false }));

app.get('/', (_, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
