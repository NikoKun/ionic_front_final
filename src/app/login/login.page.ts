import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public todo : FormGroup;

  public showError: boolean = false;
  public errorMSG: string;

  constructor(public http: HttpClient, public formBuilder: FormBuilder, private router: Router ) { 


  }

  ngOnInit() {
    

    document.getElementsByName('menu').forEach(element => {
      element.hidden = true;
    }); 

    this.todo = this.formBuilder.group({
      username_email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  login(){

    if (localStorage.getItem('image') != '') {
      this.todo.value.image = localStorage.getItem('image');
    }

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.http.post(this.requestsURL+'logmein/', this.todo.value, requestOptions).subscribe(data => {
      if (data[0]['response'] == 1) {
        console.log('1 '+data[0]['response']);
        localStorage.setItem('userToken', data[0]['token']);
        this.router.navigate(['/home']);
      } else {
        this.errorMSG = ''+data;
        this.showError = true;
      }
    }, error => {
      console.log(error);
    });
  }








}
