export class SolicitudesModel {
    constructor(
        public solicitud_id: string,           
        public mascota_id: string,              
        public adoptante_id: string,            
        public solicitud_fecha: string,          
        public solicitud_estado: String 
    ) {}
}
