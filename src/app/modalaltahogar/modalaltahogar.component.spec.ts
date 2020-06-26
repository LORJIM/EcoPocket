import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaltahogarComponent } from './modalaltahogar.component';

describe('ModalaltahogarComponent', () => {
  let component: ModalaltahogarComponent;
  let fixture: ComponentFixture<ModalaltahogarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalaltahogarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalaltahogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
