import { TestBed } from '@angular/core/testing';

import { NgWalletService } from './ng-wallet.service';

describe('NgWalletService', () => {
  let service: NgWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
