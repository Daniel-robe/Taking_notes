const router = require('express').Router();
const noteTaker = require('../db/noteTaker');

router.get('/notes', (req, res) => {
    noteTaker.getNotes().then((notes) => {
        return res.json(notes)
    });
});

router.post('/notes', (req, res) => {
    noteTaker.addNote(req.body).then((note) => res.json(note));
});

module.exports = router;