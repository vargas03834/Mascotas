import { solicitudes } from "../modelos/solicitudModelo.js"; // Verifica que esta ruta sea correcta
import { mascotas } from "../modelos/mascotaModelo.js"; // Importa el modelo de mascotas
import { adoptantes } from "../modelos/adoptanteModelo.js"; // Importa el modelo de adoptantes

// Crear una nueva solicitud
const crear = (req, res) => {
    const { mascota_id, adoptante_id } = req.body;

    // Validar campos requeridos
    if (!mascota_id || !adoptante_id) {
        return res.status(400).json({
            mensaje: "El ID de la mascota y el adoptante son obligatorios."
        });
    }

    // Verificar si la mascota y el adoptante existen
    Promise.all([
        mascotas.findByPk(mascota_id),
        adoptantes.findByPk(adoptante_id)
    ]).then(([mascota, adoptante]) => {
        if (!mascota) {
            return res.status(404).json({ mensaje: "Mascota no encontrada." });
        }
        if (!adoptante) {
            return res.status(404).json({ mensaje: "Adoptante no encontrado." });
        }

        const nuevaSolicitud = {
            mascota_id,
            adoptante_id
        };

        // Crear la solicitud en la base de datos
        return solicitudes.create(nuevaSolicitud);
    }).then((resultado) => {
        res.status(201).json({
            mensaje: "Solicitud creada con éxito.",
            solicitud: resultado
        });
    }).catch((err) => {
        res.status(500).json({
            mensaje: `Error al crear la solicitud: ${err.message}`
        });
    });
};

// Buscar todas las solicitudes
const buscar = (req, res) => {
    solicitudes.findAll()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar solicitudes: ${err.message}`
            });
        });
};

// Buscar solicitud por ID
const buscarId = (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío." });
    }

    solicitudes.findByPk(id)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensaje: "Solicitud no encontrada." });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al buscar la solicitud: ${err.message}`
            });
        });
};

// Actualizar solicitud
const actualizar = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID es obligatorio." });
    }

    const { solicitud_estado } = req.body;

    if (!solicitud_estado) {
        return res.status(400).json({ mensaje: "El estado de la solicitud es obligatorio." });
    }

    solicitudes.update({ solicitud_estado }, { where: { solicitud_id: id } })
        .then((resultado) => {
            if (resultado[0] === 0) {
                res.status(404).json({ mensaje: "Solicitud no encontrada." });
            } else {
                res.status(200).json({ mensaje: "Solicitud actualizada con éxito." });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al actualizar la solicitud: ${err.message}`
            });
        });
};

// Eliminar solicitud
const eliminar = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID es obligatorio." });
    }

    solicitudes.destroy({ where: { solicitud_id: id } })
        .then((resultado) => {
            if (resultado === 0) {
                res.status(404).json({ mensaje: "Solicitud no encontrada." });
            } else {
                res.status(200).json({ mensaje: "Solicitud eliminada con éxito." });
            }
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al eliminar la solicitud: ${err.message}`
            });
        });
};

export { crear, buscar, buscarId, actualizar, eliminar };
