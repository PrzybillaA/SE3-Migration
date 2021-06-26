import { Injectable } from '@angular/core';
import { DatenbankService } from './datenbank.service'

@Injectable({
  providedIn: 'root'
})
export class GamifyService {
  private _points =0;
  private _level =1;
  private _levelTable:{[level:number] : number;}={};
  private _db:DatenbankService;
  constructor() {
    var i:number;
    for(i=1;i<50;i++){
      this._levelTable[i] = (10* Math.pow(1.2,i))
    }
    this._db = new DatenbankService();
    this._db.getLevel().then(result=>{
      this._level = result;
    })
    this._db.getPoints().then(result=>{
      this._points = result;
    })
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
  addPoints(value:number){

    this._points += value;
    if(this.checkForLevelUp()){
      this.levelUp();
    }
    return this._points;
  }
  private checkForLevelUp(){
    return this._points>=this.getTotalLevelPoints();
  }
  public getNeededPointsForLevelUp(){
    return this._levelTable[this._level]-this._points;
  }
  private getTotalLevelPoints(){
    return this._levelTable[this._level];
  }
  private levelUp(){
    this._points -= this.getTotalLevelPoints();
    this._level++;
  }
}
