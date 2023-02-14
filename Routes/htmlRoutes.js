const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.sendFile("../public/notes.html");
});

router.get('*', (req, res) => {
    res.sendFile("../public/index.html");
})