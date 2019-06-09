import { TestBed } from '@angular/core/testing';

import { MovimentoService } from './movimento.service';

describe('ExerciciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovimentoService = TestBed.get(MovimentoService);
    expect(service).toBeTruthy();
  });
});
