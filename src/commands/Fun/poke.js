'use strict'

module.exports = {
    run: function(bot,msg,args) {
        if (!msg.mentions.members.first()) return msg.reply('you are just poking air ~ mention a user pls.').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds

        msg.channel.send(`${msg.mentions.members.first()}, you've been poked by ${msg.author}`)
    },

    config: {
        name: 'poke',
        description: 'poke a user',
        aliases: [],
        permission: ''
        /**
         * Go to the link below to view a list of permissions
         * https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
         */
    }
}