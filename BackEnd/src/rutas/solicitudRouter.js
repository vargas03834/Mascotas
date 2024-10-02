import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladores/solicitudController.js";

const routerSolicitud = express.Router();

routerSolicitud.get('/', (req, res) => {
    res.send('Hola Sitio de Solicitud');
});

routerSolicitud.post('/crear', (req, res) => {
    crear(req,res);
    
});

routerSolicitud.get('/buscar', (req, res) => {
    buscar(req,res);
});

routerSolicitud.get('/buscarId/:id', (req, res) => {
    buscarId(req,res);
});

routerSolicitud.put('/actualizar/:id', (req, res) => {
    actualizar(req,res);
});

routerSolicitud.delete('/eliminar/:id', (req, res) => {
    eliminar(req,res);
});

export {routerSolicitud}