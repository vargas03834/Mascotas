import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdoptantesComponent } from './editar-adoptantes.component';

describe('EditarAdoptantesComponent', () => {
  let component: EditarAdoptantesComponent;
  let fixture: ComponentFixture<EditarAdoptantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAdoptantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAdoptantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
