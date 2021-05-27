import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Router} from "@angular/router"


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})



export class HomePage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;

  public textTest: string;
  public arrayTest: any;
  public msgText: string = "";

  public isLogged: boolean;


  constructor( private http: HttpClient, private router: Router ) { 
    
    this.textTest = "Test 2";

  }

  ngOnInit() {
    if (localStorage.getItem('image') == '' || localStorage.getItem('image') == undefined) {
      this.router.navigate(['/login']);
    }

    this.checkIsLogged();

    localStorage.setItem("showMenus", "true");


    this.http.get(this.requestsURL+'test/').subscribe(data => {
      this.arrayTest = data;
      console.log(data)
    }, err => {
      console.log(err)
    });

  }



  checkIsLogged() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };
    this.http.post(this.requestsURL+'checkuser/', localStorage.getItem('userToken'), requestOptions).subscribe(data => {
      if (data == 1) {
        this.isLogged = true;
      } else {
        document.getElementsByName('menu').forEach(element => {
          element.hidden = true;
        }); 
        this.router.navigate(['/login']);
        this.isLogged = false;
      }
    }, error => {
      console.log(error);
    });
  }










}
