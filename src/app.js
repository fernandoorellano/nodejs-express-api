import express from "express";
import bodyParser from "body-parser";
// rutas
import controladorRutas from "./controladores/controlador.js"

const app = express();
app.use(bodyParser.json());

// configuracion
app.set("port", 2000);

// enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// middlewares
app.use(express.json());

// rutas
app.use("/", controladorRutas);

export default app;