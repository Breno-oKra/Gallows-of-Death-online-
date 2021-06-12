const BD = require("./BDworlds")
module.exports = {
    getWords:BD.bancoDePalavras,
    getLenghtWords:BD.bancoDePalavras.length,
    getSockets:BD.allSockets,
    getLengthSockets:BD.allSockets.length,
    setWords: (code,value) => {
        let sockets = BD.allSockets
        let finder = sockets.findIndex((item) => item.room === `${code}`)

        sockets[finder].words = value
    },
    getWordsRoom:(code) => {
        let sockets = BD.allSockets
        let finder = sockets.findIndex((item) => item.room === `${code}`)
        return sockets[finder].words
    }
}