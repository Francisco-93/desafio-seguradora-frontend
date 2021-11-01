import { TestBed } from '@angular/core/testing';

import { ClienteServicoService } from './cliente-servico.service';

describe('ClienteServicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteServicoService = TestBed.get(ClienteServicoService);
    expect(service).toBeTruthy();
  });
});
