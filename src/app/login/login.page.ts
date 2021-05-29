import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


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

  constructor( private menuController: MenuController, public http: HttpClient, public formBuilder: FormBuilder ) { 


  }

  ngOnInit() {
    this.todo = this.formBuilder.group({
      username_email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  ionViewDidEnter() {
    this.menuController.enable(false, 'first');
    this.menuController.enable(false, 'last');
    console.log('1');
  }

  ionViewDidLeave() {
    this.menuController.enable(true, 'first');
    this.menuController.enable(true, 'last');
    console.log('2');
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
        localStorage.setItem('userToken', data[0]['token']);
        localStorage.setItem('userid', data[0]['id']);
        window.location.href = "/home";
      } else {
        this.errorMSG = ''+data;
        this.showError = true;
      }
    }, error => {
      console.log(error);
    });
  }








}
