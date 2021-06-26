import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, ToastController } from '@ionic/angular';
import { DatenbankService } from 'src/app/services/datenbank.service';
import { Todo } from 'src/app/services/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  constructor(
    private alertctrl: AlertController,
    private db: DatenbankService
  ) { }

  ngOnInit() {}

  @Input() todo: Todo;

  async loeschen(slider: IonItemSliding){
    const sicherheitsfrage = `Sicher, Bruder?`;

    const jaButton = {
      text: "Ja",
      handler: async () => {
        this.db.removeTodo(this.todo.id);
        window.location.reload();
      }
    };

    const abbrechenButton = {
      text: "Abberechen",
      role: "Cancel",
      handler: () => {
        

        slider.close();
      }
    };

    const buttons: Array<any> = [ jaButton, abbrechenButton];

    const meinAlert = await this.alertctrl.create({ 
      header: "Löschen?", 
      message: sicherheitsfrage, 
      buttons: buttons 
    });
    await meinAlert.present();
  }

}
