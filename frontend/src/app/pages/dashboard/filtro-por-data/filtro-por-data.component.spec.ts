import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPorDataComponent } from './filtro-por-data.component';

describe('FiltroPorDataComponent', () => {
  let component: FiltroPorDataComponent;
  let fixture: ComponentFixture<FiltroPorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroPorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
