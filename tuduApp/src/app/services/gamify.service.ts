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
    //Sets the Milestones with the function f(x) = 10*1.2^level
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
  /**
   * Should only be called for test purpose
   * @param value sets the points of the current user
   */
  setPoints(value:number){
    this._points = value;
  }
  /**
   * 
   * @returns the current points of the user
   */
  getPoints(){
    return this._points
  }
  /**
   * Should only be called for test purpose
   * @param value sets the level of the current user
   */
  setLevel(value:number){
    this._level = value;
  }
  /**
   * 
   * @returns the current level of the user
   */
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
  /**
   * Seves the data to Database,
   * needs to be called before app is closed
   * @returns if true if data is saved
   */
  saveToDatabase(){
    this._db.setPoints(this._points);
    this._db.setLevel(this._level);
    return true;
  }
  /**
   * 
   * @returns true if the points to reach next level are reached
   */
  private checkForLevelUp(){
    return this._points>=this.getTotalLevelPoints();
  }
  /**
   * 
   * @returns returns the points need for next level up
   */
  public getNeededPointsForLevelUp(){
    return this._levelTable[this._level]-this._points;
  }
  /**
   * 
   * @returns returns the total needed points for current level
   */
  private getTotalLevelPoints(){
    return this._levelTable[this._level];
  }
  /**
   * increases the level of the user and
   * sets the points to overflowing points
   */
  private levelUp(){
    this._points -= this.getTotalLevelPoints();
    this._level++;
  }
}
