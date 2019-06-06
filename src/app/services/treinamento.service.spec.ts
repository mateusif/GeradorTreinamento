import { TestBed } from '@angular/core/testing';

import { TreinamentoService } from './treinamento.service';

describe('TreinamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreinamentoService = TestBed.get(TreinamentoService);
    expect(service).toBeTruthy();
  });
});
