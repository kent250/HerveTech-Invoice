const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/dev', (req, res) => {
  res.send(`
    <h1>Hi there! I'm Irumva </h1>
    <p>This app was born out of a need to simplify a recurring task. ️✨</p>
    <p>I used to frequently create invoices for a place I work(ed) at. While handling a few invoices a week was manageable, the constant back-and-forth of revisions became quite burdensome. </p>
    <p>To streamline this process and reduce stress, I decided to develop this app.  It allows for a more efficient way to handle invoices, saving everyone time and frustration. ⏱️</p>
    <p>
        <a href="https://www.instagram.com/irumva.codes">Instagram</a> |
        <a href="https://irumvadev.xyz">Portfolio</a>
    </p>
  `);
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
