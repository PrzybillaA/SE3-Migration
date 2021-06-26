import { Injectable } from '@angular/core';
import { Todo } from './models/todo';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DatenbankService {
  
  testdaten = [
    new Todo().deserialize({
      titel: "Haus putzen",
      beschreibung: "Du solltest echt das Haus in der nächsten Zeit putzen. 1 mal pro Jahr reicht nicht...",
      erstellungsDatum: new Date(),
      faelligkeitsdatum: new Date(2021, 11, 24, 10, 33, 30, 0)
    }),
    new Todo().deserialize({
      titel: "Zähne putzen",
      beschreibung: "Zähne putzen!",
      erstellungsDatum: new Date(),
      faelligkeitsdatum: new Date(2022, 11, 24, 10, 33, 30, 0)
    }),
    new Todo().deserialize({
      titel: "Gassi gehen",
      beschreibung: "Geh mit Hund 3 mal am Tag Gassi.",
      erstellungsDatum: new Date(),
      faelligkeitsdatum: new Date(2032, 11, 24, 10, 33, 30, 0)
    }),
    new Todo().deserialize({
      titel: "Cash verdienen",
      beschreibung: "Arbeiten!",
      erstellungsDatum: new Date(),
      faelligkeitsdatum: new Date(2040, 11, 24, 10, 33, 30, 0)
    }),
    new Todo().deserialize({
      titel: "Neues Haus kaufen",
      beschreibung: "Man kann ja hoffen, dass man sich das irgendwann leisten kann",
      erstellungsDatum: new Date(),
      faelligkeitsdatum: new Date(2050, 11, 24, 10, 33, 30, 0)
    }),
    new Todo().deserialize({
      titel: "Neues Haus verkaufen",
      beschreibung: "Das neue Haus wird wahrscheinlich doch zu teuer sein, also verkaufe es lieber wieder",
      erstellungsDatum: new Date(),
      faelligkeitsdatum: new Date(2018, 11, 24, 10, 33, 30, 0)
    })
  ];

  constructor() {
    this.getAlleTodos().then(todos => {
      if(todos.length <= 0){
        this.testdatenBefuellen();
      }
    });
  }

  async testdatenBefuellen(){
    for(let item in this.testdaten){
      await this.setTodo(this.testdaten[item]);
    }
  }

  readonly passwortEintrag = "passwort";
  readonly loginEintrag = "loggedIn";

  async setTodo(todo: Todo): Promise<any> {
    for (let i = 0; true; i++) {
      await Storage.get({ key: "" + i }).then(data => {
        if (data.value != null) {
          // Existiert
        } else {
          todo.id = i;
        }
      })
      if (todo.id) {
        break;
      }
    }

    return new Promise((resolve, reject) => {
      Storage.set({
        key: "" + todo.id,
        value: JSON.stringify(todo),
      }).then(() => {
        resolve(todo);
      })
    });

  }

  async getTodo(id: number): Promise<Todo> {
    let item = await Storage.get({ key: "" + id });
    item = JSON.parse(item.value);
    return new Promise((resolve, reject) => {
      resolve(new Todo().deserialize(item));
    });
  }

  async getAlleTodos(): Promise<Array<Todo>> {
    let keys: Array<string> = (await Storage.keys()).keys;
    let temp: any;
    let todo: Todo;
    let returnArr: Array<Todo> = [];

    for (let item in keys) {
      // keys gibt alle Werte zu niedrig aus
      temp = parseInt(item) + 1;
      temp = await Storage.get({ key: "" + temp });
      if (temp.value != null) {
        temp = JSON.parse(temp.value);
        todo = new Todo().deserialize(temp);
        returnArr.push(todo);
      }
    }

    return new Promise((resolve, reject) => {
        resolve(returnArr);
    });
  }

  async removeTodo(id: number) {
    return new Promise((resolve, reject) => {
      Storage.remove({ key: "" + id }).then(() => {
        resolve(true);
      })
    });
  }

  async clear() {
    let keys: Array<string> = (await Storage.keys()).keys;

    return new Promise(resolve => {
      for (let item in keys) {
        Storage.remove({ key: item });
      }
      resolve(true);
    });
  }

  
  setPasswort(passwort: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.set({
        key: this.passwortEintrag,
        value: passwort
      })
        .then(() => {
          resolve(true);
        })
    });
  }

  checkPasswort(passwort: string): Promise<any> {
    return new Promise((resolve, reject) => 
      Storage.get({ key: this.passwortEintrag })
      .then(data => {
        if (data.value === passwort) {
          this.login();
          resolve(true);
        } else {
          resolve(false);
        }
      })
      );
  }

  login(){
    return new Promise((resolve, reject) => {
      Storage.set({
        key: this.loginEintrag,
        value: "true",
      }).then(() => {
        resolve(true);
      })
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
      Storage.set({
        key: this.loginEintrag,
        value: "false",
      }).then(() => {
        resolve(true);
      })
    });
  }

  isLoggedIn(){
    return new Promise((resolve, reject) => {
      Storage.get({ key: this.loginEintrag })
      .then(data => {
        resolve(data.value == "true");
      })
    });
  }

  isRegistered(){
    return new Promise((resolve) => {
      Storage.get({ key: this.passwortEintrag })
      .then(data => {
        if(data.value != undefined || data.value != null)
          resolve(true);
        resolve(false);
      })
    });
  }

  async removePasswort() {
    return new Promise((resolve, reject) => {
      Storage.remove({ key: this.passwortEintrag }).then(() => {
        resolve(true);
      })
    });
  };

  /**
   * 
   * @returns the level that is stored in the database
   */
  async getLevel(){
    return parseInt(await (await Storage.get({key:"level"})).value);
  }
  /**
   * 
   * @returns the points that is stored in the current database
   */
  async getPoints(){
    return parseInt(await (await Storage.get({key:"points"})).value); 
  }
  /**
   * 
   * @param newLevel sets the level in the database to this value
   * @returns the newValue in the database
   */
  async setLevel(newLevel:number){
    await Storage.set({key:"level",value:newLevel+""});
    return this.getLevel();
  }
  /**
   * 
   * @param newPoints sets the points int the database to this value
   * @returns the newValue in the database
   */
  async setPoints(newPoints:number){
    await Storage.set({key:"points",value:newPoints+""});
    return this.getPoints();
  }
}
