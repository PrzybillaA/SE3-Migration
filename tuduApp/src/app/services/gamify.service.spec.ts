import { TestBed } from '@angular/core/testing';

import { GamifyService } from './gamify.service';

describe('GamifyService', () => {
  let service: GamifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Method: setPoint,getPoint',() =>{

    service.setPoints(10);
    expect(service.getPoints()).toEqual(10);
  });

  it('Method: setLevel,getLevel',()=>{
    service.setLevel(10);
    expect(service.getLevel()).toEqual(10);
  })
});
