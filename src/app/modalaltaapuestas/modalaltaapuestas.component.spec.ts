import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaltaapuestasComponent } from './modalaltaapuestas.component';

describe('ModalaltaapuestasComponent', () => {
  let component: ModalaltaapuestasComponent;
  let fixture: ComponentFixture<ModalaltaapuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalaltaapuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalaltaapuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
