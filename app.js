const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

const green = chalk.green.bgYellowBright
const blueInverse = chalk.blue.bgYellowBright.inverse

// console.log(process.argv[2])

// const command = process.argv[2]

// if(command === 'add'){
//     console.log('Notes added!')
// } else if(command === 'remove'){
//     console.log('Notes removed!')
// }else{
//     console.log('We are pros!')
// }


yargs.command({
    command:'add',
    description:'Adding a note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    description: 'removing a note!',
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    description: 'List all notes!',
    handler() {
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    description: 'Reading a note!',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string' 
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()

