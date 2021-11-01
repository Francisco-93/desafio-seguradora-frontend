import { TestBed } from '@angular/core/testing';

import { ApoliceServicoService } from './apolice-servico.service';

describe('ApoliceServicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApoliceServicoService = TestBed.get(ApoliceServicoService);
    expect(service).toBeTruthy();
  });
});
