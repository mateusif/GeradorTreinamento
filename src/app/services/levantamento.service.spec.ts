import { TestBed } from '@angular/core/testing';

import { LevantamentoService } from './levantamento.service';

describe('LevantamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevantamentoService = TestBed.get(LevantamentoService);
    expect(service).toBeTruthy();
  });
});
