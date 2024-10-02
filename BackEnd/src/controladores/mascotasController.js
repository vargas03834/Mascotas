import { mascotas } from "../modelos/mascotaModelo.js";

//Crear un recurso Mascota
const crear = (req, res) => {
    //Validar 
    if (!req.body.mascota_nombre || !req.body.mascota_tipo || !req.body.mascota_edad) {
        res.status(400).send({
            mensaje: "El nombre, tipo y edad son obligatorios."
        });
        return;
    }

    const dataset = {
        mascota_nombre: req.body.mascota_nombre,
        mascota_edad: req.body.mascota_edad,
        mascota_tipo: req.body.mascota_tipo,
        mascota_raza: req.body.mascota_raza || null, // Opcional
        mascota_estado: req.body.mascota_estado || 'disponible', // Valor por defecto
        mascota_imagen: req.body.mascota_imagen || null // Opcional
    };

    //Usar Sequelize para crear el recurso en la base de datos
    mascotas.create(dataset)
        .then((resultado) => {
            res.status(200).json({
                mensaje: "Registro de Mascota Creado con Exito",
                datos: resultado
            });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Registro de Mascota No creado ::: ${err}`
            });
        });
}

//Buscar todas las Mascotas
const buscar = (req, res) => {
    mascotas.findAll().then((resultado) => {
        res.status(200).json(resultado);
    }).catch((err) => {
        res.status(500).json({
            mensaje: `No se encontraron registros ::: ${err}`
        });
    });
}

//Buscar por ID
const buscarId = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
        return;
    }
    
    mascotas.findByPk(id).then((resultado) => {
        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                mensaje: "Mascota no encontrada"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            mensaje: `Error al buscar registro ::: ${err}`
        });
    });
}

//Actualizar Mascota
const actualizar = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            mensaje: "El ID es obligatorio"
        });
        return;
    }

    const dataset = {
        mascota_nombre: req.body.mascota_nombre,
        mascota_edad: req.body.mascota_edad,
        mascota_tipo: req.body.mascota_tipo,
        mascota_raza: req.body.mascota_raza,
        mascota_estado: req.body.mascota_estado,
        mascota_imagen: req.body.mascota_imagen
    };

    // Filtrar los valores nulos para evitar actualizar campos innecesarios
    const datosAActualizar = {};
    Object.keys(dataset).forEach((key) => {
        if (dataset[key] !== undefined && dataset[key] !== null) {
            datosAActualizar[key] = dataset[key];
        }
    });

    mascotas.update(datosAActualizar, { where: { mascota_id: id } })
        .then((resultado) => {
            if (resultado[0] === 0) {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "No se encontró la mascota a actualizar"
                });
            } else {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro Actualizado"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar Registro ::: ${err}`
            });
        });
}

//Eliminar Mascota
const eliminar = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({
            mensaje: "Debe ingresar un ID"
        });
        return;
    }

    mascotas.destroy({ where: { mascota_id: id } })
        .then((resultado) => {
            if (resultado === 0) {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "No se encontró la mascota a eliminar"
                });
            } else {
                res.status(200).json({
                    tipo: 'success',
                    mensaje: `Registro con ID ${id} Eliminado Correctamente`
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar Registro ::: ${err}`
            });
        });
}

export { crear, buscar, buscarId, actualizar, eliminar };
