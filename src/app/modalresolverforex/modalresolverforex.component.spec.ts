import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalresolverforexComponent } from './modalresolverforex.component';

describe('ModalresolverforexComponent', () => {
  let component: ModalresolverforexComponent;
  let fixture: ComponentFixture<ModalresolverforexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalresolverforexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalresolverforexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
