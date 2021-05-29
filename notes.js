const fs = require('fs')
const chalk = require('chalk')

const green = chalk.green.bgYellowBright.inverse
const styled = chalk.bold.inverse
const error = chalk.bold.white.bgRed

readNote = (title) => {
    const notes = loadNotes()

    const noteFound = notes.find((note) => note.title == title)
debugger
    if(noteFound){
        console.log(styled(noteFound.title))
        console.log(noteFound.body)
    }else{
        console.log(error('No note Found!'))
    }
}

listNotes = () => {
    const notes = loadNotes()
    console.log(green('Your notes....'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.find((note) => note.title === title)

    if(!duplicateNotes){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log('Note has been added')
    }else{
        console.log('Title already taken!')
    }    
}

saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
} 

loadNotes = () => {
    try{
        const notesBuffer = fs.readFileSync('notes.json')
        notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    }
    catch (e) {
        return []
    }
}

removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    
    if (notes.length !== notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen.red.bold('Note removed!'))
    }else{
        console.log(chalk.bgRed.yellow.bold('No note found!'))
    }

}

module.exports = {
    readNote: readNote,
    listNotes: listNotes,
    addNotes: addNotes,
    removeNote: removeNote
};