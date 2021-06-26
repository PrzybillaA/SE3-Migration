import { ComponentFixture, TestBed, waitForAsync, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import { DatenbankService } from '../../services/datenbank.service';



describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let db: DatenbankService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    db = new DatenbankService();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('loginButton to todo-board page', waitForAsync(() => {
    it('should navigate', inject([Router], (router: Router) => {
      expect(router.navigate).toHaveBeenCalledWith(['/todo-board']);
    }))}));*/

  it('method: login()', () => {
    const fixture = TestBed.createComponent(LoginPage);
    let component = fixture.componentInstance;
    component.login().then(result => {
      db.isLoggedIn().then (loggedIn => {
        if(loggedIn){
          expect(result).toBeTrue();
        } else {
          expect(result).toBeFalse();
        }
      })
    })
  });


  it('method: passwortSetzen()', (done) => {
    const fixture = TestBed.createComponent(LoginPage);
    let component = fixture.componentInstance;
    component.passwort = "hund";
    component.passwortWiederholen = "hund";
    component.passwortSetzen().then(result => {
      expect(result).toBeTrue();
      component.passwortWiederholen = "hase";
      component.passwortSetzen().then(result => {
        expect(result).toBeFalse();
        done();
      })
    })
  });

  it('method: showPasswortSetzen()', (done) => {
    const fixture = TestBed.createComponent(LoginPage);
    let component = fixture.componentInstance;
    expect(component.showPasswortSetzen()).toBeTrue();
    done();
  });
});
