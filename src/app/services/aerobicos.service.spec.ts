import { TestBed } from '@angular/core/testing';

import { AerobicosService } from './aerobicos.service';

describe('AerobicosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AerobicosService = TestBed.get(AerobicosService);
    expect(service).toBeTruthy();
  });
});
