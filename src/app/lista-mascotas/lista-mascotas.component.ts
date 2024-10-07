import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {
  mascotas: MascotaModel[] = []; // Variable para almacenar la lista de mascotas
  nombreBusqueda: string = ''; // Variable para el campo de búsqueda
  tipoBusqueda: string = ''; // Variable para el filtro de tipo
  paginaActual: number = 1; // Página actual para paginación
  totalMascotas: number = 0; // Total de mascotas
  mascotasPorPagina: number = 5; // Número de mascotas por página
  totalPaginas: number = 0; // Total de páginas
  mostrarFormulario: boolean = false; // Variable para mostrar/ocultar el formulario
  nuevaMascota: MascotaModel = new MascotaModel('', '', '', '', '', '', ''); // Nuevo objeto mascota
  mostrarBienvenida: boolean = true; // Variable para controlar la vista de inicio

  constructor(private mascotaService: MascotaService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cargarMascotas(); // Cargar las mascotas al iniciar el componente
  }

  // Método para cargar mascotas
  cargarMascotas() {
    console.log('Cargando mascotas...');
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data: MascotaModel[]) => {
        this.mascotas = data;
        this.totalMascotas = this.mascotas.length; // Total de mascotas
        this.totalPaginas = Math.ceil(this.totalMascotas / this.mascotasPorPagina); // Calcular total de páginas
        console.log('Mascotas cargadas:', this.mascotas);
      },
      error: (err) => {
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }

  // Método para agregar una nueva mascota
  agregarMascota() {
    this.mascotaService.agregarMascota(this.nuevaMascota).subscribe({
      next: (response) => {
        console.log('Mascota agregada:', response);
        this.cargarMascotas(); // Recargar la lista de mascotas después de agregar
        this.mostrarFormulario = false; // Ocultar el formulario
        this.nuevaMascota = new MascotaModel('', '', '', '', '', '', ''); // Resetear el objeto
      },
      error: (err) => {
        console.error('Error al agregar la mascota:', err);
      }
    });
  }

  // Método para mostrar el formulario de agregar mascota
  mostrarFormularioMascota() {
    this.mostrarFormulario = true; // Mostrar el formulario
    this.mostrarBienvenida = false; // Ocultar mensaje de inicio
  }

  mostrarListaMascotas() {
    this.mostrarBienvenida = false; // Ocultar mensaje de inicio
    this.mostrarFormulario = false; // Ocultar formulario
    this.cargarMascotas(); // Cargar las mascotas
  }

  // Método para ocultar el formulario de agregar mascota
  cancelarAgregar() {
    this.mostrarFormulario = false; // Ocultar el formulario
    this.nuevaMascota = new MascotaModel('', '', '', '', '', '', ''); // Resetear el objeto
  }

  // Método para buscar mascotas
  buscarMascotas() {
    console.log('Buscando mascotas...');
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data: MascotaModel[]) => {
        this.mascotas = data.filter(mascota => 
          (!this.nombreBusqueda || mascota.mascota_nombre.toLowerCase().includes(this.nombreBusqueda.toLowerCase())) &&
          (!this.tipoBusqueda || mascota.mascota_tipo === this.tipoBusqueda)
        );
        this.totalMascotas = this.mascotas.length; // Actualiza el total de mascotas después de la búsqueda
        this.totalPaginas = Math.ceil(this.totalMascotas / this.mascotasPorPagina); // Calcular total de páginas
        console.log('Mascotas encontradas:', this.mascotas);
      },
      error: (err) => {
        console.error('Error al buscar mascotas:', err);
      }
    });
  }

  // Método para borrar una mascota
  borrarMascota(id: string) {
    if (confirm('¿Estás seguro de que deseas borrar esta mascota?')) {
      this.mascotaService.borrarMascota(id).subscribe({
        next: (response) => {
          console.log('Mascota borrada:', response);
          this.cargarMascotas(); 
        },
        error: (err) => {
          console.error(`Error al borrar la mascota: ${err}`);
        }
      });
    }
  }

  // Método para cambiar de página
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.cargarMascotas(); 
  }

  // Método para mostrar la vista de inicio
  mostrarInicio() {
    this.mostrarBienvenida = true; // Mostrar mensaje de inicio
    this.mostrarFormulario = false; // Ocultar formulario
    this.cargarMascotas(); // Cargar mascotas
  }
}
