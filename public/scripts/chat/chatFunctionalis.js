function onChat(){
    $(camps.miniChat).hide()
    $(camps.alignChat).show()
    camps.campDigitChat.style.display = "flex"
    camps.containerChat.style.height = "400px"
    camps.btnOnchat.setAttribute("onclick","oofnChat()")
    $(camps.msgChat).focus()
    variaveis.controlChat = true
}
function oofnChat(){
    $(camps.miniChat).show()
    $(camps.alignChat).hide()
    $(camps.campDigitChat).hide()
    camps.containerChat.style.height = "30px"
    camps.btnOnchat.setAttribute("onclick","onChat()")
    variaveis.controlChat = false
}