var controleDeAudio = true
var audio = document.getElementById("audioGame")

function play(campo){
	
	audio.play()
	var ImgAudio = document.getElementById(campo)
	let foto1 = "../assets/VolumeOn.png"
    let foto2 = "../assets/VolumeOff.png"
	
	if(controleDeAudio == false){
		ImgAudio.setAttribute("src", foto1);
		controleDeAudio = true
        audio.play();
	}else{
		ImgAudio.setAttribute("src", foto2);
		controleDeAudio = false
        audio.pause();
	}
			
}