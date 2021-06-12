const funcspadrao = require("./funcsPadrao")
const controllersDB = require("../models/modelsController")
module.exports =  {
    
    totlaPlayer:(code,socket,nsp) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)
        if(local.length == 2){
            let datas = funcspadrao.msgAutotOfGame(`Olá Bem Vindo A Sala Criada Por ${local[0].name}, Aproveite`)
            socket.emit("receive",datas)
            for (let i = 0; i < local.length; i++) {
                let data = [local[i == 0? 1 : 0].id,local[i == 0? 1 : 0].name]
                local[i].socket.emit("aguarde",data)
            }        
        }else{
            let datas = funcspadrao.msgAutotOfGame(`Olá Bem Vindo(a) A sua Sala, \n copie esse codigo (${code}) e passe para um amigo `)
            socket.emit("receive",datas)
            nsp.emit("aguarde","false")
        }
    },
    sortCalc:(code,socket) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)
        let lockey = socket === local[0].id
        if(!lockey){
            funcspadrao.forWords(socket,local,code)
        }
    },
    desconected:(code,socket,nsp) => {
        let sockets = controllersDB.getSockets
        let finder = sockets.findIndex((item) => item.room === `${code}`)
        let i = sockets[finder].sockets.findIndex((item) => item.id === socket.id)
        sockets[finder].sockets.splice(i,1)
        if(sockets[finder].sockets.length === 0){
            sockets.splice(finder,1)
        }
        nsp.emit("aguarde","false")
    },
    errorPllayer: (player,letter,code) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)
        for (let i = 0; i < local.length; i++) {
            let finder = local[i].id === player
            let data = {
                play:finder? "play1":"vilao",
                letter
            }
            local[i].socket.emit("markErro",data)

        } 
    },
    pointer:(player,letter,controlLetter,code) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)
        for (let i = 0; i < local.length; i++) {
            let finder = local[i].id === player
            let data = {
                play:finder? "play1":"vilao",
                letter,
                controlLetter
            }
            local[i].socket.emit("markPointer",data)
    
        } 
    },
    requestpower:(player,code,atakOnVillan) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)
        for (let i = 0; i < local.length; i++) {
            let finder = local[i].id === player
            let data = {
                play:finder? "play1":"vilao",
                ataks:atakOnVillan,
            }
            local[i].socket.emit("power",data)
    
        } 
    },
    outherWord:(dicas,word,socket,code) => {
        let sockets = controllersDB.getSockets
        let words = controllersDB.getWordsRoom(code)
        let acharPalavra = words.filter(item => item.dica == dicas)
        if(acharPalavra[0].palavras.length == 1){
            let retirarObjeto = words.filter(item => item.dica != dicas)
            controllersDB.setWords(code,retirarObjeto)
        }
        if(acharPalavra[0].palavras.length > 1){
            let alterar = controllersDB.getWords.filter(item => item.dica == dicas)    
            alterar[0].palavras.splice(alterar[0].palavras.indexOf(word), 1)   
            let novoBanco = controllersDB.getWords.filter(item => item.dica != dicas)   
            novoBanco.push(alterar[0])  
            controllersDB.setWords(code,novoBanco)
        }
        let local = funcspadrao.locality(sockets,code)

        funcspadrao.forWords(socket,local,code)

    },
    trocarPlayer:(player,code) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)

        for (let i = 0; i < local.length; i++) {
            let finder = local[i].id === player
            let data = {
                play:finder? "vilao":"play1",
            }
            local[i].socket.emit("trocPlayer",data)
    
        } 
    },
    endGame:(player,code) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)

        let position = local.findIndex((item) => item.id === player)
        local[position].online = false

    },
    reload:(player,code,socket) => {
        let sockets = controllersDB.getSockets
        let local = funcspadrao.locality(sockets,code)

        let position = local.findIndex((item) => item.id === player)
        local[position].online = true
        let finder = local.filter((item) => item.online === true)

        let words = controllersDB.getWordsRoom(code)

        var num = Math.floor(Math.random() * words )
        let num1 = Math.floor(Math.random() * words[num].palavras.length )

        if(finder.length === 2){
            for (let i = 0; i < local.length; i++) {
                let locke = local[i].id === player
                let data =  {
                    controlPlay: locke? "play1" : "vilao",
                    dicas: controllersDB.getWords[num].dica,
                    inputPalavra:words[num].palavras[num1].toUpperCase() 
                }
                local[i].socket.emit("newGame",data)
        
            }
        }else{
            socket.emit("reloadAguard","Aguardando Oponente")
        }

    }
    
    

}