import { TestBed } from '@angular/core/testing';

import { ContactUsMessageService } from '../contact-us-message.service';

describe('ContactUsMessageService', () => {
  let service: ContactUsMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactUsMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
