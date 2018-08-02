import { TestBed, inject } from '@angular/core/testing';

import { CreateGuardService } from './create-guard.service';

describe('CreateGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateGuardService]
    });
  });

  it('should be created', inject([CreateGuardService], (service: CreateGuardService) => {
    expect(service).toBeTruthy();
  }));
});
