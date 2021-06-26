import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamifyService {
  private _points =0;
  private _level =1;
  constructor() { }

  setPoints(value:number){
    this._points = value;
  }
  getPoints(){
    return this._points
  }
  setLevel(value:number){
    this._level = value;
  }
  getLevel(){
    return this._level;
  }
}
