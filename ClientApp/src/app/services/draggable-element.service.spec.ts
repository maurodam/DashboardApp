import { TestBed } from '@angular/core/testing';
import { DraggableElementService } from './draggable-element.service';

describe('DraggableElementService', () => {
  let service: DraggableElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraggableElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
