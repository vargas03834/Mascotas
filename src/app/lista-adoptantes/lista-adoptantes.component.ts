import { Component, OnInit } from '@angular/core';
import { AdoptantesModel } from '../shared/adoptantes.model';
import { AdoptantesService } from '../shared/adoptantes.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-adoptantes',
  templateUrl: './lista-adoptantes.component.html',
  styleUrls: ['./lista-adoptantes.component.css']
})
export class ListaAdoptantesComponent implements OnInit {
  adoptantes: AdoptantesModel[] = []; // Variable para almacenar la lista de adoptantes
  nombreBusqueda: string = ''; // Variable para el campo de búsqueda
  paginaActual: number = 1; // Página actual para paginación
  totalAdoptantes: number = 0; // Total de adoptantes
  adoptantesPorPagina: number = 5; // Número de adoptantes por página
  totalPaginas: number = 0; // Total de páginas
  mostrarFormulario: boolean = false; // Variable para mostrar/ocultar el formulario
  nuevoAdoptante: AdoptantesModel = new AdoptantesModel('', '', ''); // Nuevo objeto adoptante
  mostrarBienvenida: boolean = true; // Variable para controlar la vista de inicio

  constructor(private adoptantesService: AdoptantesService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cargarAdoptantes(); // Cargar los adoptantes al iniciar el componente
  }

  // Método para cargar adoptantes
  cargarAdoptantes() {
    console.log('Cargando adoptantes...');
    this.adoptantesService.obtenerAdoptantes().subscribe({
      next: (data: AdoptantesModel[]) => {
        this.adoptantes = data;
        this.totalAdoptantes = this.adoptantes.length; // Total de adoptantes
        this.totalPaginas = Math.ceil(this.totalAdoptantes / this.adoptantesPorPagina); // Calcular total de páginas
        console.log('Adoptantes cargados:', this.adoptantes);
      },
      error: (err) => {
        console.error('Error al cargar los adoptantes:', err);
      }
    });
  }

  // Método para buscar adoptantes
  buscarAdoptantes() {
    console.log('Buscando adoptantes...');
    this.adoptantesService.obtenerAdoptantes().subscribe({
      next: (data: AdoptantesModel[]) => {
        this.adoptantes = data.filter(adoptante => 
          !this.nombreBusqueda || adoptante.adoptante_nombre.toLowerCase().includes(this.nombreBusqueda.toLowerCase())
        );
        this.totalAdoptantes = this.adoptantes.length; // Actualiza el total de adoptantes después de la búsqueda
        this.totalPaginas = Math.ceil(this.totalAdoptantes / this.adoptantesPorPagina); // Calcular total de páginas
        console.log('Adoptantes encontrados:', this.adoptantes);
      },
      error: (err) => {
        console.error('Error al buscar adoptantes:', err);
      }
    });
  }

  // Método para borrar un adoptante
  borrarAdoptante(idAdoptante: string) {
    if (confirm('¿Estás seguro de que deseas borrar este adoptante?')) {
      this.adoptantesService.borrarAdoptante(idAdoptante).subscribe({
        next: (response) => {
          console.log('Adoptante borrado:', response);
          this.cargarAdoptantes(); // Recargar la lista de adoptantes después de borrar
        },
        error: (err) => {
          console.error(`Error al borrar el adoptante: ${err}`);
        }
      });
    }
  }

  // Método para mostrar el formulario de agregar adoptante
  mostrarFormularioAdoptante() {
    this.mostrarFormulario = true; // Mostrar el formulario
    this.mostrarBienvenida = false; // Ocultar mensaje de inicio
  }

  // Método para ocultar el formulario de agregar adoptante
  cancelarAgregar() {
    this.mostrarFormulario = false; // Ocultar el formulario
    this.nuevoAdoptante = new AdoptantesModel('', '', ''); // Resetear el objeto
  }

  // Método para mostrar la vista de inicio
  mostrarInicio() {
    this.mostrarBienvenida = true; // Mostrar mensaje de inicio
    this.mostrarFormulario = false; // Ocultar formulario
    this.cargarAdoptantes(); // Cargar adoptantes (opcional)
  }
}
  