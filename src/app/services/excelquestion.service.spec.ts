import { TestBed } from '@angular/core/testing';

import { ExcelquestionService } from './excelquestion.service';

describe('ExcelquestionService', () => {
  let service: ExcelquestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelquestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
