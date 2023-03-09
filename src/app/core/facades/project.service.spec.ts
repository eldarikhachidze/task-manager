import { TestBed } from '@angular/core/testing';

import { ProjectFacade } from './project.service';

describe('ProjectService', () => {
  let service: ProjectFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
