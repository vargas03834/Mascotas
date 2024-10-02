import { Sequelize } from "sequelize";
import {db} from "../database/conexion.js"; // Asegúrate de que la ruta a tu archivo de configuración de la base de datos sea correcta

const solicitudes = db.define("solicitudes", {
    solicitud_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mascota_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'mascotas', // Nombre de la tabla referenciada
            key: 'mascota_id' // Clave primaria de la tabla referenciada
        }
    },
    adoptante_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'adoptantes', // Nombre de la tabla referenciada
            key: 'adoptante_id' // Clave primaria de la tabla referenciada
        }
    },
    solicitud_fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    solicitud_estado: {
        type: Sequelize.ENUM('en revisión', 'aceptada', 'denegada'),
        defaultValue: 'en revisión'
    }
}, {
    tableName: 'solicitudes', // Asegúrate de que coincida con el nombre de tu tabla en la base de datos
    timestamps: false // Desactiva timestamps automáticos si no los necesitas
});

export { solicitudes };
