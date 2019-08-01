global.config = require('./config.json')
const Discord = require('discord.js')
const bot = new Discord.Client({
    disableEveryone: true
})

require('./src/handlers/events')(bot)

bot.login(config.token)