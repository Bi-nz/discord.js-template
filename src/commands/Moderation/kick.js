'use strict'

module.exports = {
    run: function(bot,msg,args) {

        if (!msg.mentions.members.first())
            return msg.reply('you must mention a server member to kick!').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds

        if (msg.mentions.members.first() === msg.member)
            return msg.reply('you cannot kick yourself!').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds

        const self = msg.guild.me
        const member = msg.mentions.members.first()
        const selfHighestRole = self.roles.highest.comparePositionTo(member.roles.highest) > 0
        const userHighestRole = msg.member.roles.highest.comparePositionTo(member.roles.highest) > 0

        if (!msg.member.hasPermission(this.config.permission))
            return msg.reply('you do not have the permission to use this command!').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds

        if (!msg.guild.me.hasPermission(this.config.permission))
            return msg.reply('I do not have the permission to kick members!').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds

        if (msg.member === msg.guild.owner || userHighestRole) {
            if (!selfHighestRole)
                return msg.reply('I am unable to kick that user for you!').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds
            if (member === msg.guild.owner)
                return msg.reply('you cannot kick the owner!').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds
            member.kick().then(() => {
                msg.channel.send(`${msg.mentions.users.first().tag} has been kicked by ${msg.member}`)
            })
        } else return msg.reply('you do not have permission to kick that user who has a same role or higher role!').then(m => m.delete({timeout:1e4})) // 1e4 = 10000 ms => 10 seconds
    },

    config: {
        name: 'kick',
        description: 'kicks a member from the server',
        aliases: [],
        permission: 'KICK_MEMBERS'
        /**
         * Go to the link below to view a list of permissions
         * https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
         */
    }
}