import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladores/adoptantesController.js";

const routerAdoptantes = express.Router();

routerAdoptantes.get('/', (req, res) => {
    res.send('Hola Sitio de Adoptantes');
});

routerAdoptantes.post('/crear', (req, res) => {
    crear(req,res);
    
});

routerAdoptantes.get('/buscar', (req, res) => {
    buscar(req,res);
});

routerAdoptantes.get('/buscarId/:id', (req, res) => {
    buscarId(req,res);
});

routerAdoptantes.put('/actualizar/:id', (req, res) => {
    actualizar(req,res);
});

routerAdoptantes.delete('/eliminar/:id', (req, res) => {
    eliminar(req,res);
});

export {routerAdoptantes}