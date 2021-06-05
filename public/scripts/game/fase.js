$("#modals").hide()
let campes = camps.camp

for (let i = 0; i < images.length; i++) {
    camps.camp.setAttribute("style", `background-image: url(${images[i]});`);
}

setTimeout(() => {
    $(camps.controlPainelJogo).hide()
    $("#game").show()
    
},3000);

function digitoJogador(){
    var letra = camps.playerDigit.value
    var armazanar = variaveis.letrasDigitadas.find(item => item == letra.toUpperCase())
    if ((letra.toUpperCase() !== " ") && (letra.toUpperCase() !== "") && (variaveis.controleDjogador === "play1")) {
        if(armazanar == undefined){
            variaveis.controleDjogador = "play1"
            mostrarErro(letra.toUpperCase()) 
            variaveis.palavra.forEach(mostrarLetra) 
        }      
    }        
}
socket.on("markErro",(data) => {
    variaveis.letrasDigitadas.push(data.letter.toUpperCase())
    data.play == 'play1' ?  markErrorPlayer(data.letter) : markErrVilian(data.letter)
})
socket.on("markPointer",(data) => { 
    variaveis.controleDeLetra = data.controlLetter 
    data.play == "play1" ? markPointPlayer(data.letter) : markPointVilan(data.letter)
    
    letrasSequenciais(data.play) 
})
function markErrorPlayer(jogadorDigta){
    if(variaveis.contadorDpontos !== 0 ){
        variaveis.contadorDpontos = variaveis.contadorDpontos - 1
    }
    
    variaveis.controleDeLetra = 0
    alterPlayer(camps.nameOponenet.value)
    variaveis.controleDjogador = "vilao"
    campsPlayer.points.innerText = `${variaveis.contadorDpontos}p`
    marcarLetraErrada(jogadorDigta)
    
}
function markErrVilian(jogadorDigta){
     // se a pontuação do vilao for igual a zero não é retirado ponto
     if(variaveisVilian.contadorDpontosVilao !== 0 ){
        // se a pontuação for maior que zero é retirado 2 pontos ao errar uma letra
        variaveisVilian.contadorDpontosVilao = variaveisVilian.contadorDpontosVilao - 1
    }
    variaveis.controleDeLetra = 0
    campsVilian.pointsVilion.innerText = `${variaveisVilian.contadorDpontosVilao}p`
    variaveis.controleDjogador = "play1"
    alterPlayer("")
    marcarLetraErrada(jogadorDigta)
    window.setTimeout(function() {
        $("#jogadorDigta").focus()
        $("#jogadorDigta").val("")                 
    },05); 
}
function markPointPlayer(){
    
    variaveis.contadorDpontos = variaveis.contadorDpontos + 2 
    campsPlayer.points.innerText = `${variaveis.contadorDpontos}p`
    
    alterPlayer("")
    window.setTimeout(function() {
        $("#jogadorDigta").focus()
        $("#jogadorDigta").val("")                 
    },05); 
}
function markPointVilan(){
    
    variaveisVilian.contadorDpontosVilao = variaveisVilian.contadorDpontosVilao + 2
    campsVilian.pointsVilion.innerText = `${variaveisVilian.contadorDpontosVilao}p`

    alterPlayer(camps.nameOponenet.value)
    
}

function mostrarErro(jogadorDigta){
    
    var achar = variaveis.palavra.find(item => item == jogadorDigta)
    //se não ouver a letra chamamos erros para atualizar a forca
    if(achar == undefined){
        
        socket.emit("error",socket.id,jogadorDigta)
       
    }else{
        variaveis.controleDeLetra = variaveis.controleDeLetra + 1
        socket.emit("pointer",socket.id,jogadorDigta,variaveis.controleDeLetra)
        
    }
    
}
function VidaPlay(){
    campsPlayer.vidaPlayer.setAttribute("src", imagesLife[variaveisVilian.ataqueDoVilao])
}
function AlerLifeProps(msg){
    let controlAlert = true
    let alertFullLife = window.setInterval(() => {
        if(controlAlert){
            camps.warnPoinst.style.color = "red"
            controlAlert = !controlAlert
        }else{
            camps.warnPoinst.style.color = "chartreuse"
            controlAlert = !controlAlert
        }
        
    }, 200);
    window.setTimeout(() => {
        camps.warnPoinst.innerText = msg
        clearInterval(alertFullLife)
    }, 2000);
}
function propsRecoverLife(points,life){
    if((variaveis.contadorDpontos >= points) && (variaveisVilian.ataqueDoVilao !== 0)){
        camps.warnPoinst.innerText = ""
        variaveisVilian.ataqueDoVilao = variaveisVilian.ataqueDoVilao - life
        variaveis.contadorDpontos = variaveis.contadorDpontos - points
        camps.points.innerText = variaveis.contadorDpontos
        VidaPlay()
    }else{
        if(variaveisVilian.ataqueDoVilao == 0){
            camps.warnPoinst.innerText = "vida cheia"
            AlerLifeProps("")
        }else{
            let falta = points - variaveis.contadorDpontos
            let alert = camps.warnPoinst.innerText = "falta " + falta + " pontos"
            AlerLifeProps(alert)
        }
       
    }
}
function recoverLife(item){    
    if(item == 1){
        propsRecoverLife(8,1)
    }
    if(item == 3){
        propsRecoverLife(12,2)
    }
    if(item == 6){
        propsRecoverLife(15,5)
    }
    
}

function alterPlayer(item){
    variaveis.temp !== ""? clearInterval(variaveis.temp) : ""
    socket.emit("time",Date.now())
    let lockye = item !== ""
    camps.turnPlayer.innerText = lockye? `Vez do ${item} ${variaveis.controleDeLetra} de 3 Sequencia` : `Sua Vez De Jogar ${variaveis.controleDeLetra} de 3 Sequencia`  
    lockye? $(camps.turnPlayer).css("background-color","#fff") : $(camps.turnPlayer).css("background-color","greenyellow")
}
socket.on("getTime",(time) => {
    contTime(time)   
})
socket.on("trocPlayer",(data) => {
    console.log(data)
    variaveis.controleDjogador = data.play
    alterPlayer(data.play === "play1"? "" : camps.nameOponenet.value)
})

