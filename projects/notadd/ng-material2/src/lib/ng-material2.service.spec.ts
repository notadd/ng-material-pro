import { TestBed, inject } from '@angular/core/testing';

import { NgMaterial2Service } from './ng-material2.service';

describe('NgMaterial2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgMaterial2Service]
    });
  });

  it('should be created', inject([NgMaterial2Service], (service: NgMaterial2Service) => {
    expect(service).toBeTruthy();
  }));
});
