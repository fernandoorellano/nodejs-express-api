import express from "express";
import fs from "fs";

const app = express();

const leerDatos = () => {
    try{
        const datos = fs.readFileSync("./src/database/db.json");
        return JSON.parse(datos);
    }
    catch(error){
        console.log(error)
    }
};

const crearDatos = (datos) => {
    try{
        fs.writeFileSync("./src/database/db.json", JSON.stringify(datos));
    }
    catch(error){
        console.log(error)
    }
};


app.get("/", (req, res) => {
    res.send("Bienvenido!");
});

app.get("/publicaciones", (req, res) => {
    const datos = leerDatos();
    res.json(datos.publicacion)
});

app.get("/publicaciones/:id", (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const publicacionaBuscar = datos.publicacion.find((publicacionaBuscar) => publicacionaBuscar.id === id);
    res.json(publicacionaBuscar);
});

app.post("/publicaciones", (req, res) => {
    const datos = leerDatos();
    const body = req.body;
    const nuevaPublicacion = {
        id: datos.publicacion.length +1,
        ...body,
    };
    datos.publicacion.push(nuevaPublicacion);
    crearDatos(datos);
    res.json(nuevaPublicacion);
});

app.put("/publicaciones/:id", (req, res) => {
    const datos = leerDatos();
    const body = req.body;
    const id = parseInt(req.params.id);
    const publiIndex = datos.publicacion.findIndex((publicacion) => publicacion.id === id);
    datos.publicacion[publiIndex] = {
        ...datos.publicacion[publiIndex],
        ...body,
    };
    crearDatos(datos);
    res.json({message: "Se actualizo la publicacion."})
});

app.delete("/publicaciones/:id", (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const publiIndex = datos.publicacion.findIndex((publicacion) => publicacion.id === id);
    datos.publicacion.splice(publiIndex, 1);
    crearDatos(datos);
    res.json({message: "Se borro."})
});

export default app;