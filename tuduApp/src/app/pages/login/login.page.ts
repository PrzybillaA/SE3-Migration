import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatenbankService } from 'src/app/services/datenbank.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwort: string;
  passwortWiederholen: string;


  constructor(private router: Router, private db: DatenbankService, private alertCtrl: AlertController) { }

  ngOnInit() {
  this.showPasswortSetzen();
  }

  login(){
    return this.router.navigate(['/<todo-board']);  
  }


async passwortSetzen(){
  if (this.passwort.localeCompare(this.passwortWiederholen)){
    this.db.setPasswort
    return this.router.navigate(['/todo-board']);
  }else{
    const meinAlert = await this.alertCtrl.create({
      header: "hi",
      message: "ho",
      });
      
      await meinAlert.present();
  }
  
  this.router.navigate(['/todo-board']);  }

showPasswortSetzen(){
  if (false){ //Ändern zu erster Zeit des Aufrufs
    document.getElementById("passwortContainer").style.display= "none";
    document.getElementById("passwortButton").style.display= "none";
    document.getElementById("loginContainer").style.display= "";
    document.getElementById("loginButton").style.display= "";
  }else{
    document.getElementById("passwortContainer").style.display= "";
    document.getElementById("passwortButton").style.display= "";
    document.getElementById("loginContainer").style.display= "none";
    document.getElementById("loginButton").style.display= "none";
  }
  
  ;  }

}

