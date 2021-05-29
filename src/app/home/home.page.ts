import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})



export class HomePage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public iduser = localStorage.getItem('userid');

  public todo : FormGroup;

  public textTest: string;
  public arrayTest: any;
  public msgText: string = "";

  public isLogged: boolean;
  public profilePic: string | ArrayBuffer  = '';
  public dataToSend: any;


  constructor( private http: HttpClient, public formBuilder: FormBuilder ) { 
    
    this.textTest = "Test 2";

  }

  ngOnInit() {
    localStorage.setItem('idVisiting', '');

    this.todo = this.formBuilder.group({
      body: ['', Validators.required],
    });

    this.getHomePosts();



  }


  post(){
    if (localStorage.getItem('imagePost') != '') {
      this.todo.value.image = localStorage.getItem('imagePost');
    }

    this.todo.value.token = localStorage.getItem('userToken')

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.http.post(this.requestsURL+'post/', this.todo.value, requestOptions).subscribe(data => {
      if (data == 1) {
        localStorage.setItem('imagePost', '');
        this.msgText = "";
        this.getHomePosts();
      }
    }, error => {
      console.log(error);
    });
  }


  loadProfPic($event) {
    var reader = new FileReader();
    reader.onload = () => {
      this.profilePic = reader.result;
      localStorage.setItem('imagePost', reader.result.toString())
    };
    reader.readAsDataURL($event.target.files[0])
  }



  getHomePosts() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'getHomePosts/', ''+localStorage.getItem('userToken'), requestOptions).subscribe(data => {
      this.arrayTest = data;
      this.checkIsLogged();
    }, error => {
      console.log(error);
    });
  }


  redirectPost(id) {
    console.log(id);
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
        console.log(1);
      } else {
        this.isLogged = false;
        window.location.href = "/login";
        console.log(2);
      }
    }, error => {
      console.log(error);
    });
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
