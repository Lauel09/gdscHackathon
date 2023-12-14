const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'));


app.get('/', (req, res) => {
    fs.readFile('home.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));