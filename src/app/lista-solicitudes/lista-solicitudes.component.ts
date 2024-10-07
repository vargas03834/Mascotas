import { Component, OnInit } from '@angular/core';
import { SolicitudesModel } from '../shared/solicitudes.model';
import { SolicitudService } from '../shared/solicitudes.service';
import { AdoptantesService } from '../shared/adoptantes.service'; // Asegúrate de tener un servicio para obtener adoptantes
import { MascotaService } from '../shared/mascota.service'; // Asegúrate de tener un servicio para obtener mascotas
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {
  solicitudes: SolicitudesModel[] = []; // Variable para almacenar la lista de solicitudes
  adoptantes: any[] = []; // Variable para almacenar la lista de adoptantes
  mascotas: any[] = []; // Variable para almacenar la lista de mascotas
  nombreBusqueda: string = ''; // Variable para el campo de búsqueda
  paginaActual: number = 1; // Página actual para paginación
  totalSolicitudes: number = 0; // Total de solicitudes
  solicitudesPorPagina: number = 5; // Número de solicitudes por página
  totalPaginas: number = 0; // Total de páginas
  mostrarFormulario: boolean = false; // Variable para mostrar/ocultar el formulario
  nuevaSolicitud: SolicitudesModel = new SolicitudesModel('', '', '', '', ''); // Nuevo objeto solicitud
  mostrarBienvenida: boolean = true; // Variable para controlar la vista de inicio
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private solicitudService: SolicitudService, 
    private adoptantesService: AdoptantesService, // Asegúrate de inyectar el servicio de adoptantes
    private mascotaService: MascotaService, // Asegúrate de inyectar el servicio de mascotas
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarSolicitudes(); // Cargar las solicitudes al iniciar el componente
    this.cargarAdoptantes(); // Cargar la lista de adoptantes
    this.cargarMascotas(); // Cargar la lista de mascotas
  }

  // Método para cargar solicitudes
  cargarSolicitudes() {
    console.log('Cargando solicitudes...');
    this.solicitudService.obtenerSolicitudes().subscribe({
      next: (data: SolicitudesModel[]) => {
        this.solicitudes = data;
        this.totalSolicitudes = this.solicitudes.length; // Total de solicitudes
        this.totalPaginas = Math.ceil(this.totalSolicitudes / this.solicitudesPorPagina); // Calcular total de páginas
        console.log('Solicitudes cargadas:', this.solicitudes);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las solicitudes. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error al cargar las solicitudes:', err);
      }
    });
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

  // Método para buscar solicitudes
  buscarSolicitudes() {
    console.log('Buscando solicitudes...');
    this.solicitudService.obtenerSolicitudes().subscribe({
      next: (data: SolicitudesModel[]) => {
        this.solicitudes = data.filter(solicitud => 
          !this.nombreBusqueda || solicitud.solicitud_id.includes(this.nombreBusqueda)
        );
        this.totalSolicitudes = this.solicitudes.length; // Actualiza el total de solicitudes después de la búsqueda
        this.totalPaginas = Math.ceil(this.totalSolicitudes / this.solicitudesPorPagina); // Calcular total de páginas
        console.log('Solicitudes encontradas:', this.solicitudes);
      },
      error: (err) => {
        this.errorMessage = 'Error al buscar solicitudes. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error al buscar solicitudes:', err);
      }
    });
  }

  // Método para borrar una solicitud
  borrarSolicitud(idSolicitud: string) {
    if (confirm('¿Estás seguro de que deseas borrar esta solicitud?')) {
      this.solicitudService.borrarSolicitud(idSolicitud).subscribe({
        next: (response) => {
          console.log('Solicitud borrada:', response);
          this.cargarSolicitudes(); // Recargar la lista de solicitudes después de borrar
        },
        error: (err) => {
          this.errorMessage = 'Error al borrar la solicitud. Por favor, inténtalo de nuevo más tarde.';
          console.error(`Error al borrar la solicitud: ${err}`);
        }
      });
    }
  }

  // Método para mostrar el formulario de agregar solicitud
  mostrarFormularioSolicitud() {
    this.mostrarFormulario = true; // Mostrar el formulario
    this.mostrarBienvenida = false; // Ocultar mensaje de inicio
  }

  // Método para ocultar el formulario de agregar solicitud
  cancelarAgregar() {
    this.mostrarFormulario = false; // Ocultar el formulario
    this.nuevaSolicitud = new SolicitudesModel('', '', '', '', ''); // Resetear el objeto
  }

  // Método para mostrar la vista de inicio
  mostrarInicio() {
    this.mostrarBienvenida = true; // Mostrar mensaje de inicio
    this.mostrarFormulario = false; // Ocultar formulario
    this.cargarSolicitudes(); // Cargar solicitudes (opcional)
  }

  // Método para obtener las solicitudes de la página actual
  obtenerSolicitudesPorPagina(): SolicitudesModel[] {
    const startIndex = (this.paginaActual - 1) * this.solicitudesPorPagina;
    return this.solicitudes.slice(startIndex, startIndex + this.solicitudesPorPagina);
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    console.log('Enviando nueva solicitud:', this.nuevaSolicitud);
    this.solicitudService.agregarSolicitud(this.nuevaSolicitud).subscribe({
      next: (response) => {
        console.log('Solicitud agregada:', response);
        this.cargarSolicitudes(); // Recargar la lista de solicitudes después de agregar
        this.cancelarAgregar(); // Ocultar el formulario
      },
      error: (err) => {
        this.errorMessage = 'Error al agregar la solicitud. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error al agregar la solicitud:', err);
      }
    });
  }
}
