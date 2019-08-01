'use strict'
const FS = require('fs')

module.exports = class CommandHandler {
    constructor(data = {}) {
        this.bot = data.msg.client
        this.msg = data.msg
        this.cmd = data.cmd
        this.args = data.args

        /**
         * @type {Object}
         */
        this.command = undefined
    }

    /**
     * @description Checks if a command exists
     * @returns {?Object} this.command
     */

    isCommand() {
        /**
         * @description Just a check, to be exact
         * @type {Boolean}
         */
        var cmdFound = false
        /**
         * @description Basically a correct folder location when using FS / File System module
         * @type {String}
         */
        const FSlocation = 'src/commands'
        /**
         * @description Basically a correct folder location when using require
         * @type {String}
         */
        const Rlocation = '../commands'

        if (FS.existsSync(FSlocation)) {
            FS.readdirSync(FSlocation).forEach(f1 => {
                if (cmdFound) return;
                if (FS.lstatSync(`${FSlocation}/${f1}`).isDirectory()) {
                    FS.readdirSync(`${FSlocation}/${f1}`).forEach(f2 => {
                        if (cmdFound) return;
                        if (FS.lstatSync(`${FSlocation}/${f1}/${f2}`).isFile() && f2.substring(f2.length-3).toLowerCase() === '.js') {
                            const cmd = require(`${Rlocation}/${f1}/${f2}`)
                            const config = cmd.hasOwnProperty('config') && cmd.config
                            const aliases = config.hasOwnProperty('aliases') && config.aliases
                            if (config) {
                                if ( (config.hasOwnProperty('name') && config.name === this.cmd) || (aliases && aliases.indexOf(this.cmd) !== -1) ) {
                                    cmdFound = true
                                    this.command = cmd
                                }
                            }
                        }
                    })
                }
            })
        }
        return this.command
    }

    /**
     * @description Creates an object of commands in each categories
     * @param {?Array} blacklist 
     * @returns {?Object} commands
     */
    helpMenu(blacklist = []) {
        if (!Array.isArray(blacklist)) blacklist = []
        /**
         * @description Object of commands in each key of a category
         * @type {Object}
         */
        var commands = {}
        /**
         * @description Basically a correct folder location when using FS / File System module
         * @type {String}
         */
        const FSlocation = 'src/commands'
        /**
         * @description Basically a correct folder location when using require
         * @type {String}
         */
        const Rlocation = '../commands'

        if (FS.existsSync(FSlocation)) {
            FS.readdirSync(FSlocation).forEach(folder => {
                if (FS.lstatSync(`${FSlocation}/${folder}`).isDirectory() && blacklist.indexOf(folder) === -1) {
                    commands[folder] = {}
                }
            })

            for (var key in commands) {
                const directory = `${FSlocation}/${key}`
                if (FS.existsSync(directory)) {
                    FS.readdirSync(directory).forEach(f => {
                        const FSfile = `${directory}/${f}`
                        const Rfile = `${Rlocation}/${key}/${f}`
                        if (FS.lstatSync(`${FSfile}`).isFile()) {
                            commands[key][require(Rfile).config.name] = require(Rfile).config
                        }
                    })
                }
            }
        }
        return commands
    }
}