'use strict'
const FS = require('fs');

/**
 * @description automatically handles the events by filename
 */

module.exports = (bot) => {
    /**
     * @description Basically a correct folder location when using FS / File System module
     * @type {String}
     */
    const FSlocation = 'src/events'
    /**
     * @description Basically a correct folder location when using require
     * @type {String}
     */
    const Rlocation = '../events'
    if (FS.existsSync(FSlocation)) {
        FS.readdirSync(FSlocation).forEach((file) => {
            if (FS.lstatSync(`${FSlocation}/${file}`).isFile() && file.substring(file.length-3).toLowerCase() === '.js') {
                bot.on(file.substring(0,file.length-3), (...args) => {
                    try {
                        require(`${Rlocation}/${file}`)(...args)
                    } catch (ex) {
                        new (require(`${Rlocation}/${file}`))(...args)
                    }
                })
            }
        })
    }
}