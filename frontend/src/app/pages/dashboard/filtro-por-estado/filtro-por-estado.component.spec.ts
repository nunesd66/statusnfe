import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPorEstadoComponent } from './filtro-por-estado.component';

describe('FiltroPorEstadoComponent', () => {
  let component: FiltroPorEstadoComponent;
  let fixture: ComponentFixture<FiltroPorEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroPorEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPorEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
