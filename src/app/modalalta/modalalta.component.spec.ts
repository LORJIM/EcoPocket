import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaltaComponent } from './modalalta.component';

describe('ModalaltaComponent', () => {
  let component: ModalaltaComponent;
  let fixture: ComponentFixture<ModalaltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalaltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
