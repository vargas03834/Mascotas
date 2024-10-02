import { adoptantes } from "../modelos/adoptanteModelo.js"; // Verifica que esta ruta sea correcta

// Crear un recurso Adoptante
const crear = (req, res) => {
    // Validar campos
    if (!req.body.adoptante_nombre || !req.body.adoptante_email) {
        return res.status(400).send({
            mensaje: "El nombre y el email son obligatorios."
        });
    }

    const dataset = {
        adoptante_nombre: req.body.adoptante_nombre,
        adoptante_email: req.body.adoptante_email,
        adoptante_telefono: req.body.adoptante_telefono || null, // Opcional
        adoptante_direccion: req.body.adoptante_direccion || null // Opcional
    };

    // Usar Sequelize para crear el recurso en la base de datos
    adoptantes.create(dataset)
        .then((resultado) => {
            res.status(201).send({
                mensaje: "Registro de Adoptante Creado con Éxito",
                adoptante: resultado
            });
        })
        .catch((err) => {
            res.status(500).send({
                mensaje: `Registro de Adoptante No Creado: ${err.message}`
            });
        });
};

// Buscar todos los Adoptantes
const buscar = (req, res) => {
    adoptantes.findAll()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
};

// Buscar por ID
const buscarId = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            mensaje: "El ID no puede estar vacío"
        });
    }

    adoptantes.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({
                    mensaje: "Adoptante no encontrado"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar registro ::: ${err}`
            });
        });
};

// Actualizar Adoptante
const actualizar = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            mensaje: "El ID es obligatorio"
        });
    }

    const dataset = {
        adoptante_nombre: req.body.adoptante_nombre,
        adoptante_email: req.body.adoptante_email,
        adoptante_telefono: req.body.adoptante_telefono,
        adoptante_direccion: req.body.adoptante_direccion
    };

    // Filtrar los valores nulos para evitar actualizar campos innecesarios
    const datosAActualizar = {};
    Object.keys(dataset).forEach((key) => {
        if (dataset[key] !== undefined && dataset[key] !== null) {
            datosAActualizar[key] = dataset[key];
        }
    });

    adoptantes.update(datosAActualizar, { where: { adoptante_id: id } })
        .then((resultado) => {
            if (resultado[0] === 0) {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "No se encontró el adoptante a actualizar"
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
};

// Eliminar Adoptante
const eliminar = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            mensaje: "Debe ingresar un ID"
        });
    }

    adoptantes.destroy({ where: { adoptante_id: id } })
        .then((resultado) => {
            if (resultado === 0) {
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "No se encontró el adoptante a eliminar"
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
