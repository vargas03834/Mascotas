import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const adoptantes = db.define("adoptantes", {
    adoptante_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    adoptante_nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    adoptante_email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true // Debe ser único
    },
    adoptante_telefono: {
        type: Sequelize.STRING(20),
        allowNull: true // Puede ser opcional
    },
    adoptante_direccion: {
        type: Sequelize.STRING(255),
        allowNull: true // Puede ser opcional
    }
});

export { adoptantes };
