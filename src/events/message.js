'use strict'
const CommandHandler = require('../handlers/commands')
var case_sensitive = false // set to true if you want it to be case-sensitive

function formatter(msg) {
    let prefix = global.config.prefix
    
    var args = msg.content.slice(prefix.length).split(/\s+/g) // First, get the args
    var cmd = args.shift() // Now get the command

    if (!case_sensitive) {
        prefix = prefix.toLowerCase()
        cmd = cmd.toLowerCase()
    }

    return { msg, cmd, args }
}

module.exports = async (msg) => {
    // Returns if the sender of the message is a bot
    if (msg.author.bot) return

    var startsWithPrefix = msg.content.indexOf(config.prefix) === 0
    if (!case_sensitive) startsWithPrefix = msg.content.toLowerCase().indexOf(config.prefix.toLowerCase()) === 0

    // Checks if the message does not start with the prefix
    if (!startsWithPrefix) return
    const format = formatter(msg)
    const command = new CommandHandler(format).isCommand()
    if (command) command.run(msg.client, msg, format.args)
}