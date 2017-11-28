import { TestBed, inject } from '@angular/core/testing';

import { PendingorderService } from './pendingorder.service';

describe('PendingorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingorderService]
    });
  });

  it('should be created', inject([PendingorderService], (service: PendingorderService) => {
    expect(service).toBeTruthy();
  }));
});
