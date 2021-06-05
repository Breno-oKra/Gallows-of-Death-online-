function contTime(time){
    $(camps.campTime).css("background-color","greenyellow")

    let times = new Date(time).getSeconds()
    let timeFixed = 60
    variaveis.time = times

    variaveis.temp = window.setInterval(() => {
        camps.campTime.innerText = timeFixed--
        times = times + 1
        if(((variaveis.time + 60 - 14) === times) && variaveis.controlTime === true){
            variaveis.controlTime = false
            console.log("breno")
            $(camps.campTime).css("background-color","rgb(231, 69, 41)")
            camps.audioEfects.setAttribute("src","../../assets/timeEnd.mp3")
            camps.audioEfects.play();
        }
        if(((variaveis.time + 60) === times) && variaveis.controleDjogador === "play1"){
            variaveis.controleDeLetra = 0
            socket.emit("trocarPlayer",socket.id)                  
            clearInterval(variaveis.temp)
        }
    },1000)   
}