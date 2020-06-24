import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbajaComponent } from './modalbaja.component';

describe('ModalbajaComponent', () => {
  let component: ModalbajaComponent;
  let fixture: ComponentFixture<ModalbajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
