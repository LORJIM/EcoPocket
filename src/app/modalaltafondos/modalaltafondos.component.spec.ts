import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaltafondosComponent } from './modalaltafondos.component';

describe('ModalaltafondosComponent', () => {
  let component: ModalaltafondosComponent;
  let fixture: ComponentFixture<ModalaltafondosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalaltafondosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalaltafondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
