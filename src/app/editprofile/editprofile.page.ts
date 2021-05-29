import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})

export class EditprofilePage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public idUser = localStorage.getItem('userid');

  public showError = false;
  public errorMSG: string;

  public todo : FormGroup;
  public profilePic: string | ArrayBuffer  = 'https://censur.es/wp-content/uploads/2019/03/default-avatar.png';
  public msgText: string = "";

  public dataToSend: any;
  public visitrdUserData: any;




  constructor( public http: HttpClient, public formBuilder: FormBuilder ) { 


  }

  ngOnInit() {
    localStorage.setItem('image', '')
    
    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],

      firstname: [''],
      lastname: [''],
      description: [''],
    });

    this.getuser();


  }



  getuser() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.dataToSend = { 'iduser': this.idUser, 'token': localStorage.getItem('userToken') }
    this.http.post(this.requestsURL+'getuserbyid/', this.dataToSend, requestOptions).subscribe(data => {
      if (data != 'no') {
        if (data['img'] == '') {
          data['img'] = 'https://censur.es/wp-content/uploads/2019/03/default-avatar.png';
        } else {
          data['img'] = this.imagesURL + data['img'];
        }
        this.visitrdUserData = data;
        this.profilePic = data['img'];

        
        this.todo.setValue({
          username: [ this.visitrdUserData.username ],
          email: [ this.visitrdUserData.email ],
          password: [''],

          firstname: [ this.visitrdUserData.last_name ],
          lastname: [ this.visitrdUserData.first_name ],
          description: [ this.visitrdUserData.desc ],
        });


      } else {

      }
    }, error => {
      console.log(error);
    });


  }






  editprofile(){
    if (localStorage.getItem('image') != '') {
      this.todo.value.image = localStorage.getItem('image');
    }

    this.todo.value.token = localStorage.getItem('userToken');


    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.http.post(this.requestsURL+'editprofile/', this.todo.value, requestOptions).subscribe(data => {
      if (data == 1) {
        localStorage.setItem('image', '')
        this.redirectUser(this.idUser)
      } else {
        this.errorMSG = ''+data;
        this.showError = true;
      }
    }, error => {
      console.log(error);
    });
  }



  redirectUser(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/profile";
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
