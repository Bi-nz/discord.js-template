'use strict'

module.exports = {
    run: function(bot,msg,args) {
        msg.channel.send(':ping_pong: Pong!')
    },

    config: {
        name: 'ping',
        description: 'ping pong',
        aliases: ['pang', 'pong', 'pung'],
        permission: ''
        /**
         * Go to the link below to view a list of permissions
         * https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
         */
    }
}