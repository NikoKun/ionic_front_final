import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {


  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public iduser = localStorage.getItem('userid');

  public todo : FormGroup;

  public textTest: string;
  public initialPost: any;
  public arrayTest: any;
  public msgText: string = "";

  public isLogged: boolean;
  public profilePic: string | ArrayBuffer  = '';
  public dataToSend: any;



  constructor(private http: HttpClient, public formBuilder: FormBuilder,  ) { }

  ngOnInit() {
    localStorage.setItem('idVisiting', '');

    this.todo = this.formBuilder.group({
      body: ['', Validators.required],
    });


    this.getResponsePosts();


  }



  getResponsePosts() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.dataToSend = { 'idpost': localStorage.getItem('idPostVisiting') , 'token': localStorage.getItem('userToken') }
    this.http.post(this.requestsURL+'getPost/', this.dataToSend, requestOptions).subscribe(data => {
      this.initialPost = data;
      this.checkIsLogged();
    }, error => {
      console.log(error);
    });

    this.dataToSend = { 'idpost': localStorage.getItem('idPostVisiting') , 'token': localStorage.getItem('userToken') }
    this.http.post(this.requestsURL+'getResponsePosts/', this.dataToSend, requestOptions).subscribe(data => {
      this.arrayTest = data;
      this.checkIsLogged();
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





  redirectUser(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/profile";
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
        this.getResponsePosts();
      }
    }, error => {
      console.log(error);
    });
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


  like(idpost, itemLiked) {
    this.initialPost['like'] = 1;
    this.initialPost['likes']++;

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
    this.initialPost['like'] = 0;
    this.initialPost['likes']--;

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
