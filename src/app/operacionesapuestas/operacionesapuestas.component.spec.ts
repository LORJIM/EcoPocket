import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesapuestasComponent } from './operacionesapuestas.component';

describe('OperacionesapuestasComponent', () => {
  let component: OperacionesapuestasComponent;
  let fixture: ComponentFixture<OperacionesapuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionesapuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesapuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
