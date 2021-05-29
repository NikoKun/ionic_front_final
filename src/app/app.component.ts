import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  
  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;

  public userData: any;

  constructor(private menu: MenuController, private http: HttpClient ) {

  }


  ngOnInit() {
    document.getElementsByName('menu').forEach(element => {
      element.hidden = false;
    }); 


    if (localStorage.getItem('userToken') != 'no' && localStorage.getItem('userToken') != undefined) {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      const requestOptions =  { headers: {'Content-Type':'application/json'} };
  
      this.http.post(this.requestsURL+'getuser/', ''+localStorage.getItem('userToken'), requestOptions).subscribe(data => {
        if (data != 'no') {
          if (data['img'] == '') {
            data['img'] = 'https://censur.es/wp-content/uploads/2019/03/default-avatar.png';
          } else {
            data['img'] = this.imagesURL + data['img'];
          }
          this.userData = data;
        } else {
  
        }
      }, error => {
        console.log(error);
      });
    }
  }




  rediractProfile() {
    localStorage.setItem('idVisiting', localStorage.getItem('userid'));
    window.location.href = "/profile";
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



  loggout() {
    localStorage.setItem('userToken', 'no');
    localStorage.setItem('userid', 'no');
    window.location.href = "/login";
  }



}
