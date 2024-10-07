export class MascotaModel {
  constructor(
    public mascota_id: string, // Para almacenar el ID de la mascota (mascota_id en la BD)
    public mascota_nombre: string, // Nombre de la mascota
    public mascota_edad: string, // Edad de la mascota
    public mascota_tipo?: string, // Tipo de mascota (opcional)
    public mascota_raza?: string, // Raza de la mascota (opcional)
    public mascota_estado?: string, // Estado de la mascota (opcional)
    public mascota_imagen?: string // Foto de la mascota (opcional)
  ) {}
}
