const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NoteTaker {
    readNotes() {
        return readFileAsync('db/db.json');
    }

    writeNotes(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.readNotes().then((notes) => {
            let readNotes;

            try{
                readNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                readNotes = [];
            }

            return readNotes;
        });
    }

    addNote(note) {
        const {title, text} = note;

        if(!title){
            throw new Error("Note title cant be empty");
        } if (!text){
            throw new Error("Note text cant be empty");
        }

        let newNote = {title, text}

        return this.getNotes().then((notes) => [...notes, newNote])
            .then((newNotes) => this.writeNotes(newNotes)).then(() => newNote);
    }
}

module.exports = new NoteTaker();