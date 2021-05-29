import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage implements OnInit {


  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;

  public showError = false;
  public errorMSG: string;

  public todo : FormGroup;
  public profilePic: string | ArrayBuffer  = 'https://censur.es/wp-content/uploads/2019/03/default-avatar.png';

  public msgText: string = "";


  constructor( public http: HttpClient, public formBuilder: FormBuilder ) { 


  }

  ngOnInit() {
    localStorage.setItem('image', '')
    
    document.getElementsByName('menu').forEach(element => {
      element.hidden = true;
    }); 

    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

      firstname: [''],
      lastname: [''],
      description: [''],
    });
  }


  register(){
    if (localStorage.getItem('image') != '') {
      this.todo.value.image = localStorage.getItem('image');
    }

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.http.post(this.requestsURL+'register/', this.todo.value, requestOptions).subscribe(data => {
      if (data == 1) {
        localStorage.setItem('image', '')
        window.location.href = "/login";
      } else {
        this.errorMSG = ''+data;
        this.showError = true;
      }
    }, error => {
      console.log(error);
    });
  }





  loadProfPic($event) {
    var reader = new FileReader();
    reader.onload = () => {
      this.profilePic = reader.result;
      localStorage.setItem('image', reader.result.toString())
    };
    reader.readAsDataURL($event.target.files[0])
  }
  





}
