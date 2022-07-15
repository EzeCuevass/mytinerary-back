require("dotenv").config()
require("./config/database")
const express = require("express")
const cors = require("cors")
const passport = require("passport")
const axios = require("axios")
const Router = require("./routes/routes")
const app = express()
const PORT = 4000

// Se setea el puerto de el servidor
app.set("port", PORT)
// Cuando se entra a la direccion "/", da una respuesta que seria "Servidor creado!"
app.get("/", (req, res) => {
    res.send("<h1>Nkunku sos mi DIOS</h1>")
})
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use("/api", Router)
// Escucha al puerto, y manda un mensaje en la consola indicanto el puerto en el que se esta trabajando
app.listen(PORT, ()=>{
    console.log("Servidor corriendo en puerto: " + app.get("port"))
}) 