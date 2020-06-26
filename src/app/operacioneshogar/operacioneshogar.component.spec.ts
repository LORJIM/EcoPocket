import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacioneshogarComponent } from './operacioneshogar.component';

describe('OperacioneshogarComponent', () => {
  let component: OperacioneshogarComponent;
  let fixture: ComponentFixture<OperacioneshogarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacioneshogarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacioneshogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
