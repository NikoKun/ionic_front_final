import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;


  constructor(private menu: MenuController, private router: Router ) {

  }


  ngOnInit() {
    document.getElementsByName('menu').forEach(element => {
      element.hidden = false;
    }); 
    
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
