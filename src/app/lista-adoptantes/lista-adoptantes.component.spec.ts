import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdoptantesComponent } from './lista-adoptantes.component';

describe('ListaAdoptantesComponent', () => {
  let component: ListaAdoptantesComponent;
  let fixture: ComponentFixture<ListaAdoptantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAdoptantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAdoptantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
