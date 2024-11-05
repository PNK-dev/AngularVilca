import { TestBed } from '@angular/core/testing';

import { Service7escuelaService } from './service7escuela.service';

describe('Service7escuelaService', () => {
  let service: Service7escuelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service7escuelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
