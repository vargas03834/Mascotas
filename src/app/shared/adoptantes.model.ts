export class AdoptantesModel {
    constructor(
        public adoptante_id: string, 
        public adoptante_nombre: string, 
        public adoptante_email: string, 
        public adoptante_telefono?: string, 
        public adoptante_direccion?: string 
    ) {}
}
