import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public idUser = localStorage.getItem('idVisiting');

  public visitrdUserData: any;
  public arrayTest: any;
  public dataToSend: any;

  public option: any = 1;

  constructor( private http: HttpClient, ) { 

    
  }




  ngOnInit() {


    this.loaduser()
  
  }



  loaduser() {

    if (this.idUser != 'no' && this.idUser != undefined) {
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
          setTimeout(() => {
            this.loadposts(this.option);
          }, 1500);
        } else {
  
        }
      }, error => {
        console.log(error);
      });
    }

    

  }

  loadposts(optionselected) {
    var progressbar = document.getElementById('postprogresbar');
    progressbar.style.visibility = "visible"; 

    this.option = optionselected;

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    if (this.idUser != 'no' && this.idUser != undefined) {

      this.dataToSend = { 'iduser': this.idUser, 'token': localStorage.getItem('userToken') }


      var option1 = document.getElementById('option1');
      var option2 = document.getElementById('option2');
      var option3 = document.getElementById('option3');

      if (this.option == 1) {

        option1.classList.remove("menuButton");
        option1.classList.add("menuButtonSelected");

        option2.classList.remove("menuButtonSelected");
        option2.classList.add("menuButton");

        option3.classList.remove("menuButtonSelected");
        option3.classList.add("menuButton");

        this.http.post(this.requestsURL+'getUsersPosts/', ''+this.idUser, requestOptions).subscribe(data => {
          this.arrayTest = data;
          progressbar.style.visibility = "hidden"; 
        }, error => {
          console.log(error);
        });
      } else if (this.option == 2) {

        option1.classList.remove("menuButtonSelected");
        option1.classList.add("menuButton");

        option2.classList.remove("menuButton");
        option2.classList.add("menuButtonSelected");

        option3.classList.remove("menuButtonSelected");
        option3.classList.add("menuButton");

        this.http.post(this.requestsURL+'getResponseToYou/', this.dataToSend, requestOptions).subscribe(data => {
          this.arrayTest = data;
          progressbar.style.visibility = "hidden"; 
        }, error => {
          console.log(error);
        });
      } else if (this.option == 3) {

        option1.classList.remove("menuButtonSelected");
        option1.classList.add("menuButton");

        option2.classList.remove("menuButtonSelected");
        option2.classList.add("menuButton");

        option3.classList.remove("menuButton");
        option3.classList.add("menuButtonSelected");

        this.http.post(this.requestsURL+'getLikedPosts/', this.dataToSend, requestOptions).subscribe(data => {
          this.arrayTest = data;
          progressbar.style.visibility = "hidden"; 
        }, error => {
          console.log(error);
        });
      }

      

    }
  }





  redirectFollowing(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/following";
  }

  redirectFollowers(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/followers";
  }

  edit() {
    window.location.href = "/editprofile";
  }




  follow(iduser) {
    this.visitrdUserData['followQuestion'] = 1;
    this.visitrdUserData['your_followers']++;

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

  unfollow(iduser) {
    this.visitrdUserData['followQuestion'] = 0;
    this.visitrdUserData['your_followers']--;

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

















  redirectUser(id) {
    localStorage.setItem('idVisiting', id);
    window.location.href = "/profile";
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
      this.loadposts(this.option);
    }, error => {
      console.log(error);
    });
  }



  

  

}
