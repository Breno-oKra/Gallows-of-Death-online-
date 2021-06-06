const musics = [
	{name:"AdhesiveWombat Sawtines",music:"/assets/musics/AdhesiveWombat - Sawtines_50k.mp3"},
	{name:"Cetus NCS",music:"/assets/musics/Lensko - Cetus NCS Release _50k.mp3"},
	{name:"Vexento Pixel Party",music:"/assets/musics/Vexento - Pixel Party_50k.mp3"},
	{name:"AdhesiveWombat 8 Bit Adventure",music:"/assets/musics/AdhesiveWombat - 8 Bit Adventure_50k.mp3"},
	{name:"AdhesiveWombat Rocket Science",music:"/assets/musics/AdhesiveWombat - Rocket Science_50k.mp3"}	
]
var musicToc = {}
var ramdomMusic = Math.floor(Math.random() * musics.length)
camps.audioGame.setAttribute("src",musics[ramdomMusic].music)
camps.nameMusic.innerText = musics[ramdomMusic].name
$(camps.audioGame).bind('ended', function(){
	nextMusics(musicToc.name)
});

function nextMusics(music){
    let finder = musics.findIndex((item) => item.name === music)
	console.log(finder)
	var local = finder + 1
	if(musics[local] === undefined){
		local = 0
	}
	musicToc = musics[local]
	camps.audioGame.setAttribute("src",musics[local].music)
	camps.audioGame.play();
	camps.nameMusic.innerText = musics[local].name
}
