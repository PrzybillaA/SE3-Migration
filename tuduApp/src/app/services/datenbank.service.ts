import { Injectable } from '@angular/core';
import { Todo } from './models/todo';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DatenbankService {

  constructor() { }

  readonly passwortEintrag = "passwort";

  async setTodo(todo: Todo): Promise<any> {
    for (let i = 0; true; i++) {
      await Storage.get({ key: "" + i }).then(data => {
        if (data.value != null) {
          // Existiert
        } else {
          todo.id = i;
        }
      }).catch(e => {
        return e;
      });
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
      }).catch(e => {
        reject(e);
      });
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
      if (returnArr)
        resolve(returnArr);
      else
        reject([]);
    });
  }

  async removeTodo(id: number) {
    return new Promise((resolve, reject) => {
      Storage.remove({ key: "" + id }).then(() => {
        resolve(true);
      }).catch((e) => {
        reject(false);
      });
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
        }).catch(e => {
          reject(e);
        });
    });
  }

  checkPasswort(passwort: string): Promise<any> {
    return new Promise((resolve, reject) => 
      Storage.get({ key: this.passwortEintrag })
      .then(data => {
        if (data.value === passwort) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(e => {
        reject(e);
      }));
  }

  async removePasswort() {
    return new Promise((resolve, reject) => {
      Storage.remove({ key: this.passwortEintrag }).then(() => {
        resolve(true);
      }).catch((e) => {
        reject(false);
      });
    });
  };
}
