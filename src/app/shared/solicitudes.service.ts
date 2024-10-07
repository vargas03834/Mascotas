import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudesModel } from '../shared/solicitudes.model'; // Asegúrate de que la ruta a tu modelo sea correcta

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  BASE_URL = 'http://localhost:4000/solicitudes'; // URL base para la API de solicitudes

  constructor(private http: HttpClient) { }

  // Lista completa de Solicitudes
  obtenerSolicitudes() {
    return this.http.get<SolicitudesModel[]>(`${this.BASE_URL}/buscar`);
  }

  // Buscar una solicitud por ID
  obtenerSolicitud(idSolicitud: string) {
    return this.http.get<SolicitudesModel>(`${this.BASE_URL}/buscarId/${idSolicitud}`);
  }

  // Crear una nueva Solicitud
  agregarSolicitud(solicitud: SolicitudesModel) {
    return this.http.post<string>(`${this.BASE_URL}/crear`, solicitud);
  }

  // Actualizar una Solicitud
  actualizarSolicitud(solicitud: SolicitudesModel) {
    return this.http.put<string>(`${this.BASE_URL}/actualizar/${solicitud.solicitud_id}`, solicitud);
  }

  // Eliminar una Solicitud
  borrarSolicitud(idSolicitud: string) {
    return this.http.delete<string>(`${this.BASE_URL}/eliminar/${idSolicitud}`);
  }
}
