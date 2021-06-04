function alt(tempo,campo,foto){
	window.setTimeout(function() {
		campo.setAttribute("style", `background-image: url(${foto});`);
	}, tempo);
	
}

