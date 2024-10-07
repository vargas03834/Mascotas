import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdoptantesModel } from '../shared/adoptantes.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptantesService {

  BASE_URL = 'http://localhost:4000/adoptantes';

  constructor(private http: HttpClient) { }

  // Lista completa de Adoptantes
  obtenerAdoptantes() {
    return this.http.get<AdoptantesModel[]>(`${this.BASE_URL}/buscar`);
  }

  // Buscar un adoptante por ID
  obtenerAdoptante(idAdoptante: string) {
    return this.http.get<AdoptantesModel>(`${this.BASE_URL}/buscarId/${idAdoptante}`);
  }

  // Crear un Adoptante
  agregarAdoptante(adoptante: AdoptantesModel) {
    return this.http.post<string>(`${this.BASE_URL}/crear`, adoptante);
  }

  // Actualizar un Adoptante
  actualizarAdoptante(adoptante: AdoptantesModel) {
    return this.http.put<string>(`${this.BASE_URL}/actualizar/${adoptante.adoptante_id}`, adoptante);
  }

  // Eliminar un Adoptante
  borrarAdoptante(idAdoptante: string) {
    return this.http.delete<string>(`${this.BASE_URL}/eliminar/${idAdoptante}`);
  }
}
