const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const commentsFile = path.join(__dirname, 'comments.json');

const getComments = () => {
    if (fs.existsSync(commentsFile)) {
        const commentsData = fs.readFileSync(commentsFile);
        return JSON.parse(commentsData);
    }
    return [];
};

const saveComments = (comments) => {
    fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
};

app.post('/add-comment', (req, res) => {
    const { name, message } = req.body;
    const comments = getComments();
    comments.push({ name, message });
    saveComments(comments);
    res.json({ success: true });
});

app.get('/comments', (req, res) => {
    res.json(getComments());
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
