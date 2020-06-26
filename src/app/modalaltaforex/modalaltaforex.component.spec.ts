import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaltaforexComponent } from './modalaltaforex.component';

describe('ModalaltaforexComponent', () => {
  let component: ModalaltaforexComponent;
  let fixture: ComponentFixture<ModalaltaforexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalaltaforexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalaltaforexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
