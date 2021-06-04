var id = document.getElementById("codin")
var btnCode = document.getElementById("btnCode")
var namePlayer = document.getElementById("name-player")
function focusSection(item,control,position){
    
    let len = $(item).width()
    if(len <= 300){
        document.querySelector(control).style.display = "flex"
        $(item).css("position","absolute")
        $(item).css("top","0")
        $(item).css(position,"0")
        $(item).css("z-index","3")
        
        $(item).width(300)       
    }  
}
function OFFfocusSection(item,control){
    let len = $(item).width()
    $(item).css("position","")
    document.querySelector(control).style.display = "none"
    if(len <= 300){
        $(item).width("18%")
        $(item).css("z-index","3")
    }else{
        $(item).css("z-index","0")
    }
    
}
const verificaEspaco = (string) => /\s/g.test(string);
function alt(){
    if(verificaEspaco(namePlayer.value)){
        namePlayer.value.indexOf(" ") === 0 ? namePlayer.value = `User${Math.floor(Math.random() * 10000)}` : ""
    }
    if(id.value !== ""){   
        document.getElementById('form-2').action = `/game/${id.value}`;

    }
    
}
function onCode(){
    btnCode.style.display = "none"
    id.style.display = "block"
}