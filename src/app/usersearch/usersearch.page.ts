import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';






@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.page.html',
  styleUrls: ['./usersearch.page.scss'],
})
export class UsersearchPage implements OnInit {




  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public iduser = localStorage.getItem('userid');

  public todo : FormGroup;

  public arrayTest: any;

  public isLogged: boolean;
  public dataToSend: any;







  constructor( private http: HttpClient, public formBuilder: FormBuilder ) { 
    

  }




  ngOnInit() {
    localStorage.setItem('idVisiting', '');

    var progressbar = document.getElementById('postprogresbar');
    progressbar.style.visibility = "hidden"; 

    this.todo = this.formBuilder.group({
      searchabar: ['', Validators.required],
    });

    this.checkIsLogged();



  }



  getSearch() {

    var progressbar = document.getElementById('postprogresbar');
    progressbar.style.visibility = "visible"; 


    this.todo.value.token = localStorage.getItem('userToken');

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'usersearch/', this.todo.value, requestOptions).subscribe(data => {
      this.arrayTest = data;
      progressbar.style.visibility = "hidden"; 
    }, error => {
      console.log(error);
    });
  }


  post(){
    this.getSearch();
  }







  redirectUser(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/profile";
  }




  checkIsLogged() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'checkuser/', ''+localStorage.getItem('userToken'), requestOptions).subscribe(data => {
      if (data == 1) {   
        this.isLogged = true;
      } else {
        this.isLogged = false;
        window.location.href = "/login";
      }
    }, error => {
      console.log(error);
    });
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
    this.arrayTest[this.arrayTest.indexOf(user)]['followQuestion'] = 1;
    this.arrayTest[this.arrayTest.indexOf(user)]['your_followers']++;

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
    this.arrayTest[this.arrayTest.indexOf(user)]['followQuestion'] = 0;
    this.arrayTest[this.arrayTest.indexOf(user)]['your_followers']--;

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
