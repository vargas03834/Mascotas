import { Component, OnInit } from '@angular/core';
import { AdoptantesModel } from '../shared/adoptantes.model';
import { AdoptantesService } from '../shared/adoptantes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-adoptantes',
  templateUrl: './editar-adoptantes.component.html',
  styleUrl: './editar-adoptantes.component.css'
})
export class EditarAdoptantesComponent implements OnInit {

  idAdoptante = '';
  adoptante = new AdoptantesModel('', '', '', '');  // Ajusta el constructor según los campos del modelo Adoptante

  constructor(private adoptantesService: AdoptantesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.idAdoptante = this.route.snapshot.params['idAdoptante'];
    console.log(`El idAdoptante es ${this.idAdoptante}`);

    if (this.idAdoptante) {
      // Si el idAdoptante existe, se está editando un adoptante
      console.log('La solicitud viene de Editar');
      this.adoptantesService.obtenerAdoptante(this.idAdoptante).subscribe({
        next: data => {
          console.log(data);
          this.adoptante = data;
          console.log(this.adoptante);
        },
        error: err => {
          console.log(`Error: ${err}`);
        }
      });
    } else {
      // Si no existe idAdoptante, se está creando un nuevo adoptante
      console.log('La solicitud viene de Nuevo Adoptante');
    }
  }

  onSubmit() {
    console.log("On Submit");
    if (this.adoptante.adoptante_id) {
      // Si el adoptante ya tiene un ID, se está actualizando
      this.adoptantesService.actualizarAdoptante(this.adoptante).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/adoptantes']);
        },
        error: err => {
          console.log(`Error al actualizar: ${err}`);
        }
      });
    } else {
      // Si no tiene ID, se está creando uno nuevo
      this.adoptantesService.agregarAdoptante(this.adoptante).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/adoptantes']);
        },
        error: err => {
          console.log(`Error al agregar: ${err}`);
        }
      });
    }
  }
}
