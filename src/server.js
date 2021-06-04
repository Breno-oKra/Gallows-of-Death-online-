
const http = require("http")
const express = require("express")
const io = require("socket.io")
const ejs = require('ejs')
const funcMain = require("./controllers/funcMain")
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
const server = http.Server(app).listen(process.env.PORT || 3000)
const socket = new io.Server(server)
app.set("views","src/views")
// a view engine vai renderizar html
app.set("view engine","html")
app.engine("html",ejs.renderFile)


const DB = require("./models/BDworlds")
const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","W","Y","Z"]
app.get("/",(req,res)=>{
    
    let coder = `${alfabeto[Math.floor(Math.random() * alfabeto.length)]}${Math.floor(Math.random() * 5000)}${alfabeto[Math.floor(Math.random() * alfabeto.length)]}`
    let err =""
    let rooms = 0
    if(DB.allSockets.length !== 0){
        DB.allSockets.forEach((item) => {
            rooms += item.sockets.length
        })
    }
    return res.render("login.ejs",{coder,err,rooms})
})
app.get("/chat404",(req,res) => {
    let coder = Math.random(5000)
    let err ="Sala Não Encontrada"
    let rooms = 0
    if(DB.allSockets.length !== 0){
        DB.allSockets.forEach((item) => {
            rooms += item.sockets.length
        })
    }
    return res.render("login.ejs",{coder,err,rooms})
})
app.get("/chatNegado",(req,res) => {
    let coder = Math.random(5000)
    let err = "Sala cheia"
    let rooms = 0
    if(DB.allSockets.length !== 0){
        DB.allSockets.forEach((item) => {
            rooms += item.sockets.length
        })
    }
    return res.render("login.ejs",{coder,err,rooms})
})
app.post("/game/:id",(req,res)=>{
    if(req.body.code !== "" ){    
        if(DB.allSockets.length !== 0){
            let finder = DB.allSockets.findIndex((item) => item.room === `${req.body.code}`)
            if(finder === -1){
                return res.redirect("/chat404")
            }
            var local = DB.allSockets.find((item) => item.room === `${req.params.id}`).sockets.length
            if(local === 2){       
                return res.redirect("/chatNegado")
            }
        }else{
            return res.redirect("/chat404")
        }
    }
    let name = req.body.name
    let code = req.params.id
    let control = true
    funcMain.all(control,name,code,socket)
    return res.render("index.ejs",{name,code})
})
