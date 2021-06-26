import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatenbankService } from 'src/app/services/datenbank.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwort: string;
  passwortLogin: string;
  passwortWiederholen: string;


  constructor(private router: Router, private db: DatenbankService, private toastCtrl: ToastController) { }

  ngOnInit() {
  this.showPasswortSetzen();
  }

  async login(){
    if (this.db.checkPasswort(this.passwortLogin)){
    return this.router.navigate(['/todo-board']);  
    } else{
    const toast = await this.toastCtrl.create({
      message: "Passwort falsch!",
      duration: 2000
      });
      await toast.present();
  }
  }

async passwortSetzen(){
if (this.passwort == this.passwortWiederholen && this.passwort != undefined ){
    this.db.setPasswort(this.passwort)
    return this.router.navigate(['/todo-board']);
  }else{
    const toast = await this.toastCtrl.create({
      message: "Passwörter stimmen nicht überein!",
      duration: 2000
      });
      await toast.present();
  }
  
   }

async showPasswortSetzen(){
  if (await this.db.isRegistered()){ 
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
  return true;
  }

}


