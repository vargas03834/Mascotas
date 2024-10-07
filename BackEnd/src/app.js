import express from 'express';
import cors from 'cors';
import { routerMascotas } from './rutas/mascotasRouter.js';
import { routerAdoptantes } from './rutas/adoptantesRouter.js';
import { routerSolicitud } from './rutas/solicitudRouter.js';
import { db } from './database/conexion.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Verificar conexión a la base de datos
db.authenticate()
    .then(() => {
        console.log('Conexión a Base de datos correcta');
    })
    .catch(err => {
        console.log(`Conexión a Base de datos incorrecta: ${err}`);
    });

db.sync({ force: false })
    .then(() => {
        console.log('Sincronización con la base de datos correcta');
    })
    .catch(err => {
        console.log(`Error al sincronizar base de datos: ${err}`);
    });

app.get('/', (req, res) => {
    res.send('Hola Sitio Principal');
});

app.use("/mascotas", routerMascotas);
app.use("/adoptantes", routerAdoptantes);
app.use("/solicitudes", routerSolicitud);

app.listen(PORT, () => {
    console.log(`Servidor inicializado en el puerto ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
