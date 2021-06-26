import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamifyService {
  private _points =0;
  private _level =1;
  private _levelTable:{[level:number] : number;}={};
  constructor() {
    var i:number;
    for(i=1;i<50;i++){
      this._levelTable[i] = (10* Math.pow(1.2,i))
    }
   }

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
