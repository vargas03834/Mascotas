import express from "express";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerAdoptantes } from "./rutas/adoptantesRouter.js"; // Asegúrate de que la ruta sea correcta
import { routerSolicitud } from "./rutas/solicitudRouter.js";

import { db } from "./database/conexion.js";

// Crear instancia de express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Verificar conexión a la base de datos
db.authenticate()
    .then(() => {
        console.log('Conexión a Base de datos correcta');
    })
    .catch(err => {
        console.log(`Conexión a Base de datos incorrecta: ${err}`);
    });

// Sincronizar la base de datos (forzar recreación de tablas)
db.sync({ force: true }) 
.then(() => {
    // Abrir servicio e iniciar el servidor 
    app.listen(PORT, () => {
        console.log(`Servidor inicializado en el puerto ${PORT}`);
    });
})
.catch(err => {
    console.log(`Error al sincronizar base de datos: ${err}`);
});

// Definir rutas
app.get('/', (req, res) => {
    res.send('Hola Sitio Principal');
});

// Llamar rutas de mascotas
app.use("/mascotas", routerMascotas);

app.use("/adoptantes", routerAdoptantes);

app.use("/solicitudes", routerSolicitud);

// Puerto del servidor
const PORT = 4000;

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
