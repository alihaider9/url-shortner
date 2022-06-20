import { TestBed } from '@angular/core/testing';

import { TokenInjectorService } from './token-injector.service';

describe('TokenInjectorService', () => {
  let service: TokenInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
