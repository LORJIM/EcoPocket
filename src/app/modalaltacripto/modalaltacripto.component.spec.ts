import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaltacriptoComponent } from './modalaltacripto.component';

describe('ModalaltacriptoComponent', () => {
  let component: ModalaltacriptoComponent;
  let fixture: ComponentFixture<ModalaltacriptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalaltacriptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalaltacriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
