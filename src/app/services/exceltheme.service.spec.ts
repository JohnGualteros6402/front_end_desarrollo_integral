import { TestBed } from '@angular/core/testing';

import { ExcelthemeService } from './exceltheme.service';

describe('ExcelthemeService', () => {
  let service: ExcelthemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelthemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
