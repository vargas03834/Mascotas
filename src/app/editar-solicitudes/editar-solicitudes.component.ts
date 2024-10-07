import { Component, OnInit } from '@angular/core';
import { SolicitudesModel } from '../shared/solicitudes.model';
import { SolicitudService } from '../shared/solicitudes.service';
import { AdoptantesService } from '../shared/adoptantes.service'; // Asegúrate de tener un servicio para obtener adoptantes
import { MascotaService } from '../shared/mascota.service'; // Asegúrate de tener un servicio para obtener mascotas
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-solicitudes',
  templateUrl: './editar-solicitudes.component.html',
  styleUrls: ['./editar-solicitudes.component.css']
})
export class EditarSolicitudesComponent implements OnInit {

  idSolicitud = '';
  solicitud = new SolicitudesModel('', '', '', '', ''); // Ajusta el constructor según los campos del modelo Solicitudes
  adoptantes: any[] = []; // Variable para almacenar la lista de adoptantes
  mascotas: any[] = []; // Variable para almacenar la lista de mascotas
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private solicitudService: SolicitudService, 
    private adoptantesService: AdoptantesService, // Asegúrate de inyectar el servicio de adoptantes
    private mascotaService: MascotaService, // Asegúrate de inyectar el servicio de mascotas
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.idSolicitud = this.route.snapshot.params['idSolicitud'];
    console.log(`El idSolicitud es ${this.idSolicitud}`);

    if (this.idSolicitud) {
      // Si el idSolicitud existe, se está editando una solicitud
      console.log('La solicitud viene de Editar');
      this.solicitudService.obtenerSolicitud(this.idSolicitud).subscribe({
        next: data => {
          console.log(data);
          this.solicitud = data;
          console.log(this.solicitud);
        },
        error: err => {
          this.errorMessage = `Error al cargar la solicitud: ${err}`;
          console.log(this.errorMessage);
        }
      });
    } else {
      // Si no existe idSolicitud, se está creando una nueva solicitud
      console.log('La solicitud viene de Nueva Solicitud');
    }

    this.cargarAdoptantes(); // Cargar la lista de adoptantes
    this.cargarMascotas(); // Cargar la lista de mascotas
  }

  // Método para cargar adoptantes
  cargarAdoptantes() {
    console.log('Cargando adoptantes...');
    this.adoptantesService.obtenerAdoptantes().subscribe({
      next: (data: any[]) => {
        this.adoptantes = data; // Almacena la lista de adoptantes
        console.log('Adoptantes cargados:', this.adoptantes);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los adoptantes. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error al cargar los adoptantes:', err);
      }
    });
  }

  // Método para cargar mascotas
  cargarMascotas() {
    console.log('Cargando mascotas...');
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data: any[]) => {
        this.mascotas = data; // Almacena la lista de mascotas
        console.log('Mascotas cargadas:', this.mascotas);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las mascotas. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }

  onSubmit() {
    console.log("On Submit");
    if (this.solicitud.solicitud_id) {
      // Si la solicitud ya tiene un ID, se está actualizando
      this.solicitudService.actualizarSolicitud(this.solicitud).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/solicitudes']);
        },
        error: err => {
          this.errorMessage = `Error al actualizar: ${err}`;
          console.log(this.errorMessage);
        }
      });
    } else {
      // Si no tiene ID, se está creando una nueva
      this.solicitudService.agregarSolicitud(this.solicitud).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/solicitudes']);
        },
        error: err => {
          this.errorMessage = `Error al agregar: ${err}`;
          console.log(this.errorMessage);
        }
      });
    }
  }
}
