'use strict'

const CommandHandler = require('../../handlers/commands')
const { MessageEmbed } = require('discord.js')

module.exports = {
    run: function(bot,msg,args) {
        // A blacklist for categories that should not be shown - your category folder name
        const blacklist = [];
        const help = new CommandHandler({msg:msg,cmd:'',args:args}).helpMenu(blacklist)
        const ME = new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL(), msg.author.displayAvatarURL())
            .setTitle('Help Menu')
        for (const key in help) {
            var cmdList = []
            for (const _key in help[key]) {
                cmdList.push(help[key][_key].name)
            }
            ME.addField(key, cmdList.join(', '))
        }
        msg.channel.send(ME)
    },

    config: {
        name: 'help',
        description: 'help menu',
        aliases: [],
        permission: ''
        /**
         * Go to the link below to view a list of permissions
         * https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
         */
    }
}