import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras } from '@angular/router';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;


  constructor() { }

  ngOnInit() {


  }

}
