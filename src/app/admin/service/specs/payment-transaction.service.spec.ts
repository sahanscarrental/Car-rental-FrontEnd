import { TestBed } from '@angular/core/testing';

import { PaymentTransactionService } from '../payment-transaction.service';

describe('PaymentTransactionService', () => {
  let service: PaymentTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
