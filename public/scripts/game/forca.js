var socket = io(`/${camps.coder.value}`);
//sorteio da palavra
let tips = camps.tips

function esconderItem(item){
    if(item !== " "){
        $(`.${item}`).hide()
    }else{
        $(`.${item}`).show()
    }
   
}
function recuperaPalavra(){
    
    var len = variaveis.palavra.length
    variaveis.palavra.splice(0,len)  
       
    // ------------------------ retirando letras anteriores --------------------------------------

    // haschildNotes verifica se a childs(apendchild)
    rezetaCampos()
    dividePalavra(variaveis.inputPalavra)
    
    //variaveis.palavraSeparada = palavra
    variaveis.palavra.forEach(esconderItem)
    if(variaveis.controleDjogador == "play1"){     
        alterPlayer("")
        camps.playerDigit.focus()
            
    }else{
        alterPlayer(camps.nameOponenet.value)
    }  
}
function dividePalavra(input){
    
    for (let i = 0; i < input.length; i++) {
        if((input[i] !== " ") && (input[i] !== "-") && (input[i] !== "_") && (input[i] !== ".") && (input[i] !== "#") && (input[i] !== "$")){
            variaveis.palavra.push(input[i])
            variaveis.palavraInteligente.push(input[i])
            var encapuslar = document.createElement("div")
            encapuslar.setAttribute("class","linhasBottom")
            var td = document.createElement("div")
            td.setAttribute("class", `${input[i]}`)
            td.innerText = `${input[i]}`
            encapuslar.appendChild(td)
            camps.tableWorlds.appendChild(encapuslar)
        }else{

            variaveis.palavra.push("-")
            variaveis.controleLenghtPalavra = variaveis.controleLenghtPalavra + 1
            var encapuslar = document.createElement("div")
            encapuslar.setAttribute("class","linhasBottomSpace")
            var td = document.createElement("div")
            td.setAttribute("class", `espace`)
            td.innerText = "-"
            encapuslar.appendChild(td)
            camps.tableWorlds.appendChild(encapuslar)
        }
       
        
        
   }
}
function marcarLetraErrada(letra){
    var LetrasErradas = document.createElement("div")
    LetrasErradas.setAttribute("class","boxLetrasErradas")

    var letras = document.createElement("p")
    letras.innerText = letra

    LetrasErradas.appendChild(letras)
    camps.wrongletters.appendChild(LetrasErradas)
}
function mostrarLetra(item){ 
    if((item == camps.playerDigit.value.toUpperCase()) /*|| (item == variaveis.plavraVilao)*/){
        variaveis.controledePalavra = variaveis.controledePalavra + 1
        //caso erre para o controle para o priximo jogador, no caso vilao
        
        socket.emit("letter","vilao",item,variaveis.controledePalavra)
        if((variaveis.controledePalavra + variaveis.controleLenghtPalavra) == variaveis.inputPalavra.length){
            trocaPlavra()
        }
        
    }
    
} 
function letrasSequenciais(user){
    if(user == "play1"){
    //controle de numero de acertos sequenciais
        if(variaveis.controleDeLetra >= 3 ){
            variaveis.controleDjogador = "vilao"  
            variaveis.controleDeLetra = 0
            camps.turnPlayer.innerText = `Vez do ${camps.nameOponenet.value} ${variaveis.controleDeLetra} de 3 Sequencia`
            
        }
    }else{
        if(variaveis.controleDeLetra >= 3 ){
            variaveis.controleDjogador = "play1"
            
            variaveis.controleDeLetra = 0
            camps.turnPlayer.innerText = `Sua Vez De Jogar ${variaveis.controleDeLetra} de 3 Sequencia`
        }
    }
    
}
function rezetaCampos(){
    while (camps.tableWorlds.hasChildNodes()) {  
   
        camps.tableWorlds.removeChild(camps.tableWorlds.firstChild);
    }
    while (camps.wrongletters.hasChildNodes()) {  

        camps.wrongletters.removeChild(camps.wrongletters.firstChild);
    }
   
    variaveis.controleLenghtPalavra = 0
    variaveis.letrasDigitadas = []
    variaveis.controledePalavra = 0
    
  }
function trocaPlavra(){ 
    socket.emit("outherWord",variaveis.dicas,variaveis.inputPalavra,socket.id)   
}
