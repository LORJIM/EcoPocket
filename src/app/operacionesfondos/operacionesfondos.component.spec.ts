import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesfondosComponent } from './operacionesfondos.component';

describe('OperacionesfondosComponent', () => {
  let component: OperacionesfondosComponent;
  let fixture: ComponentFixture<OperacionesfondosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionesfondosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesfondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
