import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public idUser = localStorage.getItem('idVisiting');
  public mainname: string = "";

  public dataToSend: any;
  public followUsers: any;

  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.loadusers();
  }




  loadusers() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    if (this.idUser != 'no' && this.idUser != undefined) {
 
      this.dataToSend = { 'iduser': this.idUser, 'token': localStorage.getItem('userToken') }
      this.http.post(this.requestsURL+'getUsersFollowed/', this.dataToSend, requestOptions).subscribe(data => {
        this.mainname = data[0]['mainname']
        this.followUsers = data;
      }, error => {
        console.log(error);
      });
    }
  }


  redirectUser(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/profile";
  }








  redirectFollowing(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/following";
  }

  redirectFollowers(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/followers";
  }



  follow(iduser, user) {
    this.followUsers[this.followUsers.indexOf(user)]['followQuestion'] = 1;
    this.followUsers[this.followUsers.indexOf(user)]['your_followers']++;

    this.dataToSend = { 'iduser': iduser, 'token': localStorage.getItem('userToken') }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'follow/', this.dataToSend, requestOptions).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  unfollow(iduser, user) {
    this.followUsers[this.followUsers.indexOf(user)]['followQuestion'] = 0;
    this.followUsers[this.followUsers.indexOf(user)]['your_followers']--;

    this.dataToSend = { 'iduser': iduser, 'token': localStorage.getItem('userToken') }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'unfollow/', this.dataToSend, requestOptions).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }













}
