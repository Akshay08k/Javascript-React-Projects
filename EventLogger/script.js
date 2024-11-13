const fs = require('fs');
const os = require('os');

const eventEmitter = require('events');

class Logger extends eventEmitter {
    log(message) {
        this.emit('message', { message })
    }
}

const newLoger = new Logger()
const logFile = './EventLogger/eventlog.txt'

const logToFile = (e) => {
    const logMessage = `${new Date().toISOString()} - ${e.message} \n`
    fs.appendFileSync(logFile, logMessage)
}

newLoger.on('message', logToFile)

setInterval(() => {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100;
    // console.log(memoryUsage); //Just For Debugging
    newLoger.log(`Current Memory Usage : ${memoryUsage.toFixed(2)}`)
}, 3000)

console.log('Application Started');
