import app from "./app.js";

const main = () => {
    app.listen(app.get("port"));
    console.log(`El servidor esta corriendo en el puerto ${app.get("port")}`);
};

main();