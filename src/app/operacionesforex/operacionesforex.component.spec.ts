import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesforexComponent } from './operacionesforex.component';

describe('OperacionesforexComponent', () => {
  let component: OperacionesforexComponent;
  let fixture: ComponentFixture<OperacionesforexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionesforexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesforexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
