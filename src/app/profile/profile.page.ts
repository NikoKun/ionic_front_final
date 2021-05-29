import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public iduser = localStorage.getItem('userid');

  public idUser = localStorage.getItem('idVisiting');
  public visitrdUserData: any;
  public arrayTest: any;
  public dataToSend: any;

  constructor( private http: HttpClient, ) { }

  ngOnInit() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    if (this.idUser != 'no' && this.idUser != undefined) {
 
      this.dataToSend = { 'iduser': this.idUser, 'token': localStorage.getItem('userToken') }
      this.http.post(this.requestsURL+'getuserbyid/', this.dataToSend, requestOptions).subscribe(data => {
        if (data != 'no') {
          if (data['img'] == '') {
            data['img'] = 'https://censur.es/wp-content/uploads/2019/03/default-avatar.png';
          } else {
            data['img'] = this.imagesURL + data['img'];
          }
          this.visitrdUserData = data;

        } else {
  
        }
      }, error => {
        console.log(error);
      });



      this.http.post(this.requestsURL+'getUsersPosts/', ''+this.idUser, requestOptions).subscribe(data => {
        this.arrayTest = data;
      }, error => {
        console.log(error);
      });
    }







  }



  redirectPost(id) {
    console.log(id);
  }

  redirectUser(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/profile";
  }







  like(idpost, itemLiked) {
    this.arrayTest[this.arrayTest.indexOf(itemLiked)]['like'] = 1;
    this.arrayTest[this.arrayTest.indexOf(itemLiked)]['likes']++;

    this.dataToSend = { 'idpost': idpost, 'token': localStorage.getItem('userToken') }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'like/', this.dataToSend, requestOptions).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  unlike(idpost, itemLiked) {
    this.arrayTest[this.arrayTest.indexOf(itemLiked)]['like'] = 0;
    this.arrayTest[this.arrayTest.indexOf(itemLiked)]['likes']--;

    this.dataToSend = { 'idpost': idpost, 'token': localStorage.getItem('userToken') }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'unlike/', this.dataToSend, requestOptions).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }





  

  

}
