import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMaterial2Component } from './ng-material2.component';

describe('NgMaterial2Component', () => {
  let component: NgMaterial2Component;
  let fixture: ComponentFixture<NgMaterial2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMaterial2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMaterial2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
