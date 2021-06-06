function atakVilian(){
    alt(0,campes,'../../Vilao1/Animations/init1/insulto2.gif') 
    alt(500,campes,'../../Vilao1/Animations/actions/ataquw.gif')
    window.setTimeout(function() {
        camps.audioEfects.setAttribute("src","../../Vilao1/Animations/actions/somRaioVilao.mp3")
        camps.audioEfects.play()    
    },2600); //2500
    window.setTimeout(function() {
        variaveisVilian.ataqueDoVilao = variaveisVilian.ataqueDoVilao + 1
        variaveisVilian.contadorDpontosVilao = variaveisVilian.contadorDpontosVilao - 8
        campsVilian.pointsVilion.innerText = `${variaveisVilian.contadorDpontosVilao}p`
        VidaPlay()
    },6000);
    alt(6150,campes,'../../Vilao1/Animations/init1/insulto2.gif') 
}
// points = pontos necessarios para usar o ataque
// atak = quantidade de vida retirada
socket.on("power",(data) => {
    variaveis.controleDjogador = data.play
    data.play === "play1"? variaveisVilian.ataquesNoVilão = data.ataks : variaveisVilian.ataqueDoVilao = data.ataks
    data.play === "play1"? variaveisVilian.ataquesNoVilão ===5? atakORdeath("play1") : sendoAtacado() : variaveisVilian.ataqueDoVilao ===5? atakORdeath("vilao") : atakVilian()
})
function atakORdeath(item){
    if(item === 'play1'){
            $(camps.wrongletters).hide()
            $(camps.tableWorlds).hide()
            $(camps.tips).hide()
            alt(0,campes,'../../Vilao1/Animations/withPlayer1/morteThiagoOPokemon.gif')
            window.setTimeout(function() {
                camps.audioEfects.setAttribute("src","../../Vilao1/Animations/withPlayer1/fogo.mp3")
                camps.audioEfects.play();
            },1000); //2500
           
            alt(3400,campes,'../../Vilao1/Animations/withPlayer1/morteThiagoOPokemon2.gif')
    
            window.setTimeout(function() {
                socket.emit("engGame",socket.id)
                vencedor(camps.namePlayer.value)
            },3800); //2500
    }else{
        console.log("oisefudeo")
        $(camps.wrongletters).hide()
        $(camps.tableWorlds).hide()
        $(camps.tips).hide()
        alt(0,campes,'../../Vilao1/Animations/withPlayer1/mortePlayer1.gif')
        alt(4000,campes,'../../Vilao1/Animations/withPlayer1/mortePlayer2.gif')
        window.setTimeout(function() {
            socket.emit("engGame",socket.id)
            vencedor(camps.nameOponenet.value)
        },4600); //4600  
    }
}
function propsPowerPlayer(points,atak){
    if(variaveis.contadorDpontos >= points){
        variaveisVilian.ataquesNoVilão = variaveisVilian.ataquesNoVilão + atak
        variaveis.contadorDpontos = variaveis.contadorDpontos - points
        campsPlayer.points.innerText = `${variaveis.contadorDpontos}p`
        socket.emit("requestpower",socket.id,variaveisVilian.ataquesNoVilão)
               
    }else{
        var falta = points - variaveis.contadorDpontos
        campsPlayer.points.innerText = `${variaveis.contadorDpontos}p`
        let alert = camps.warnPoinst.innerText = "falta " + falta + " pontos"
        AlerLifeProps(alert)
    }
}
function PowerPlayer(poder){
    if(poder == 1 && variaveis.controleDjogador === "play1"){
        propsPowerPlayer(8,1)
    }
}
function sendoAtacado(){
    alt(0,campes,'../../Vilao1/Animations/withPlayer1/Ataque1.gif')  
    alt(2300,campes,'../../Vilao1/Animations/init1/insulto2.gif')      
    window.setTimeout(function() {
        VidaVilan()
    },2500); //2500
}