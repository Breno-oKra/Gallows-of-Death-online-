const BD = require("./BDworlds")
module.exports = {
    getWords:BD.bancoDePalavras,
    getLenghtWords:BD.bancoDePalavras.length,
    getSockets:BD.allSockets,
    getLengthSockets:BD.allSockets.length,
    
}