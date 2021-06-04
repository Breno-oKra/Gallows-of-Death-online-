function contTime(time){
    $(camps.campTime).css("background-color","greenyellow")

    let times = new Date(time).getSeconds()
    let timeFixed = 60
    variaveis.time = times

    variaveis.temp = window.setInterval(() => {
        camps.campTime.innerText = timeFixed--
        times = times + 1
        if((variaveis.time + 60 - 20) === times){
            $(camps.campTime).css("background-color","rgb(231, 69, 41)")
            
        }
        if(((variaveis.time + 60) === times) && variaveis.controleDjogador === "play1"){
            socket.emit("trocarPlayer",socket.id)   
            camps.audioEfects.setAttribute("src","../../assets/timeEnd.mp3")
            camps.audioEfects.play();     
            clearInterval(variaveis.temp)
        }
    },1000)   
}