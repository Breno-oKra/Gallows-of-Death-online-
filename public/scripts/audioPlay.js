var controleDeAudio = false
function play(campo,campAudio){
	var audio = document.getElementById(campAudio)
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
