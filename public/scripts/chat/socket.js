$(camps.oponente).hide()

function send(){
    if(camps.msgChat.value !== " " || camps.msgChat.value !== undefined){
        let data = new Date()
        var messageObject = {
            id:socket.id,
            author:camps.namePlayer.value,
            message:camps.msgChat.value,
            hour:data.toLocaleTimeString("pt-br",{hour:"2-digit",minute:"2-digit"})
        };
        $(camps.msgChat).val("")
        socket.emit("sendMessage",messageObject)
    } 
}
function newMessage(){
    $("#boxMsgs").slideToggle()
    setTimeout(() => {
        $("#boxMsgs").slideToggle()
    },2000)
}
let control = true
socket.on('receive',(msg) => {
    if(msg.id !== socket.id && variaveis.controlChat === false){
        if(control){
            control = false
            newMessage()
        }
        window.setTimeout(() => {
            control = true
        },3000)
        
        
    }   
    
    renderMessage(msg)
    
})
function renderMessage(messagem){
    let locky = messagem.id === socket.id
    camps.miniChat.innerHTML = `<div class="campMessage"><p class="user-msg-mine">${messagem.hour}<strong class="name-user-chat-Mine"> ${locky? "Voce" : messagem.author}</strong>: ${messagem.message}</p></div>`
    $(camps.chat).append(`<div  class="${locky? "campMessage" : "campMessage2"}"><div class="${locky? "user-msg" : "user-msg-oponente"}"><span class="name-user-chat"><strong >${locky? "Voce" : messagem.author}</strong><p class="hour-chat">${messagem.hour}</p></span>${messagem.message}</div></div>`)
    camps.chat.scrollTop = camps.chat.scrollHeight;
}
socket.on("aguarde",(msg) => {
    if(msg == "false"){
        $(camps.oponente).hide()
        $("#lodCont").show()
        $("#loadingOponente").text("aguardando usuario se conectar...")
    }else{
        $("#lodCont").hide()
        $("#loadingOponente").text("")
        camps.nameOponenet.value = msg[1]  
        $(camps.oponente).show()
        socket.emit("sortedCalc",socket.id)
    }
})
socket.on("sorted",(item) => {
    variaveis.dicas = item.dicas
    tips.innerText = item.dicas
    variaveis.inputPalavra = item.inputPalavra
    variaveis.controleDjogador = item.controlPlay
  
    setTimeout(() => {
        recuperaPalavra()
    }, 3000);
           
})
socket.on("letterPlay",(item) => {
    variaveis.letrasDigitadas.push(item.letter.toUpperCase())         
    variaveis.controledePalavra = item.controleWords
    $(`.${item.letter}`).show()
})

function checkMyKey(e) {
    var keyCode;
    //  Browsers de verdade
    if(e.code){
      keyCode = e.code;
      
    }
    if (keyCode == "Enter") {
      if(variaveis.controleDjogador == "play1"){
          digitoJogador()
      }
      variaveis.controlChat? send() : ""
    }
  }

