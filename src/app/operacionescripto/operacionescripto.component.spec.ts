import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionescriptoComponent } from './operacionescripto.component';

describe('OperacionescriptoComponent', () => {
  let component: OperacionescriptoComponent;
  let fixture: ComponentFixture<OperacionescriptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionescriptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionescriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
