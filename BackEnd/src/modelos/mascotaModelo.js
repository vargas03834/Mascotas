import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const mascotas = db.define("mascotas", {
    mascota_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    mascota_nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    mascota_edad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mascota_tipo: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    mascota_raza: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    mascota_estado: {
        type: Sequelize.ENUM('disponible', 'adoptado'),
        defaultValue: 'disponible'
    },
    mascota_imagen: {  // Nuevo campo para la imagen
        type: Sequelize.STRING(255), // Ajusta el tamaño según tus necesidades
        allowNull: true // Puede ser opcional
    }
});

export { mascotas };
