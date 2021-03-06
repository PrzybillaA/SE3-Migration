import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {


  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it('should have urls', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(3);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/todo-board');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/hilfe');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/einstellungen');

  }));

  it('method: menuSchliessen()', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.menuSchliessen().then(result => {
      expect(result).toBeFalse();
    })
  }));

});
