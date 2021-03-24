const fs = require("fs");

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("src/notes.json");  //reads file and gets content
        const notesJson = dataBuffer.toString();  //converts from jibberish to string
        return JSON.parse(notesJson);
    }   catch (error) {
        return [];
    }
}

const saveNotes = (allNotes) => {
    const notesJson = JSON.stringify(allNotes)
    fs.writeFileSync("src/notes.json", notesJson )
}

const addNotes = (myNote) => {
    const allNotes = loadNotes()
    allNotes.push({ reminder: myNote })
    saveNotes(allNotes);
}

const listNotes = () => {
    const allNotes = loadNotes();

    allNotes.map((note, index) => {
        console.log(`${index + 1}. ${note.reminder}`);
    });
}

const removeNote = (noteToDelete) => {
    const allNotes = loadNotes();

    const removedItem = allNotes.splice(noteToDelete - 1, 1);
    console.log(`Successfully removed ${removedItem[0].reminder}`);

    
    saveNotes(notesToKeep);
}

module.exports = {
    addNotes,
    listNotes,
    removeNote
}