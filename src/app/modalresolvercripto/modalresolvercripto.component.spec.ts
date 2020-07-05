import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalresolvercriptoComponent } from './modalresolvercripto.component';

describe('ModalresolvercriptoComponent', () => {
  let component: ModalresolvercriptoComponent;
  let fixture: ComponentFixture<ModalresolvercriptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalresolvercriptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalresolvercriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
