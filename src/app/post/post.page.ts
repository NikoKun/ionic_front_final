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
  public item: any;
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
      this.item = data;
      this.checkIsLogged();
    }, error => {
      console.log(error);
    });

    this.dataToSend = { 'idpost': localStorage.getItem('idPostVisiting') , 'token': localStorage.getItem('userToken') }
    this.http.post(this.requestsURL+'getResponsePosts/', this.dataToSend, requestOptions).subscribe(data => {
      this.arrayTest = data;
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
    this.todo.value.idposttorespond = localStorage.getItem('idPostVisiting');

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.http.post(this.requestsURL+'postresponse/', this.todo.value, requestOptions).subscribe(data => {
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
    this.item['like'] = 1;
    this.item['likes']++;

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
    this.item['like'] = 0;
    this.item['likes']--;

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




  like2(idpost, itemLiked) {
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

  unlike2(idpost, itemLiked) {
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








  redirectPost(id) {
    localStorage.setItem('idPostVisiting', id);
    window.location.href = "/post";
  }

  removepost(idpost) {
    document.getElementById('remove'+idpost).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg>';
    this.dataToSend = { 'idpost': idpost, 'token': localStorage.getItem('userToken') }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'removepost/', this.dataToSend, requestOptions).subscribe(data => {
      window.location.href = "/home";
    }, error => {
      console.log(error);
    });
  }



}
