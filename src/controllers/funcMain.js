const func = require("./functionalitis")
const controllersBD = require("../models/modelsController")
module.exports = {
    all:(control,names,code,socket) => { 
        var nsp = socket.of(`/${code}`);
        let finder = controllersBD.getSockets.findIndex((item) => item.room === `${code}`)
        nsp.on('connection', function(socket) {  
            if(control){
                control = false
                
                if(finder === -1){
                    controllersBD.getSockets.push({room:`${code}`,sockets:[{id:socket.id,name:names,socket:socket,online:true}]})
                }else{
                    controllersBD.getSockets[finder].sockets.push({id:socket.id,name:names,socket:socket,online:true})
                }
                
                func.totlaPlayer(code,socket,nsp)
    
                socket.on("disconnect",() => {
                    func.desconected(code,socket,nsp)
                })
                socket.on("sendMessage",datar => {  
                    nsp.emit("receive",datar)
                    
                })
                socket.on("sortedCalc",(socket) => {
                    func.sortCalc(code,socket)
                })
                socket.on("letter",(player,letter,controleWords) => {  
                    let data = {
                        player,
                        letter,
                        controleWords
                    }
                    nsp.emit("letterPlay",data)
                    
                })
                socket.on("error",(player,letter) => {
                    func.errorPllayer(player,letter,code)
                })
                socket.on("pointer",(player,letter,controlLetter) => {
                    func.pointer(player,letter,controlLetter,code)
                })
                socket.on("requestpower",(player,atakOnVillan,atakOfVillan) => {
                    func.requestpower(player,code,atakOnVillan,atakOfVillan)
                })
                socket.on("outherWord",(dicas,word,socket) => {
                    func.outherWord(dicas,word,socket,code)
    
                })
                socket.on("trocarPlayer",(player) => {
                    func.trocarPlayer(player,code)
                })
                socket.on("time",(time) => {
                    socket.emit("getTime",time)
                })
                socket.on("engGame",(item) => {
                    func.endGame(item,code)
                })
                socket.on("reload",(item) => {
                    func.reload(item,code,socket)
                })
                
            }
            
        })
       
    }
}