const controllerBD = require("../models/modelsController")
module.exports = {
    locality:(allSockets,code) => {
        return allSockets.find((item) => item.room === `${code}`).sockets
    },
    forWords:(socket,local) => {      
        var num = Math.floor(Math.random() * controllerBD.getLenghtWords )
        let num1 = Math.floor(Math.random() * controllerBD.getWords[num].palavras.length )

        for (let i = 0; i < local.length; i++) {
            let locke = local[i].id === socket
            let data =  {
                controlPlay: locke? "play1" : "vilao",
                dicas: controllerBD.getWords[num].dica,
                inputPalavra:controllerBD.getWords[num].palavras[num1].toUpperCase() 
            }
            local[i].socket.emit("sorted",data)
    
        } 
    },
    msgAutotOfGame:(msg) => {
        return {id:"fgghsdnhjsfgjhffdgdfg",author:"Breno-Okra criador",message:msg,hour: new Date().toLocaleTimeString("pt-br",{hour:"2-digit",minute:"2-digit"})}
    }
}