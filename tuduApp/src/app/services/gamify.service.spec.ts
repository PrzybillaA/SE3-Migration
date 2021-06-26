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
  it('Method: addPoints',()=>{
    service.setLevel(1);
    service.setPoints(1);
    expect(service.addPoints(2)).toEqual(3);
  })
  it('Method: addPoints + internal system logic',()=>{
    service.setLevel(1);
    service.setPoints(0);
    var neededPoints = service.getNeededPointsForLevelUp();
    expect(service.addPoints(neededPoints+1)).toEqual(1);
    expect(service.getLevel()).toEqual(2);

  })
  it('Method: saveToDatabase',()=>{
    expect(service.saveToDatabase()).toBeTrue();
  })
});
