import { TestBed } from '@angular/core/testing';

import { CustomConfirmDialogModelService } from './custom-confirm-dialog-model.service';

describe('CustomConfirmDialogModelService', () => {
  let service: CustomConfirmDialogModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomConfirmDialogModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
