import { Component, OnInit } from '@angular/core';


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-likedposts',
  templateUrl: './likedposts.page.html',
  styleUrls: ['./likedposts.page.scss'],
})
export class LikedpostsPage implements OnInit {

  public imagesURL = environment.imagesURL;
  public requestsURL = environment.requestsURL;
  public iduser = localStorage.getItem('userid');

  public arrayTest: any;
  public msgText: string = "";

  public isLogged: boolean;
  public profilePic: string | ArrayBuffer  = '';
  public dataToSend: any;


  constructor( private http: HttpClient ) { 
    

  }





  ngOnInit() {
    localStorage.setItem('idVisiting', '');



    this.checkIsLogged();

    this.getLikedPosts();


  }



  getLikedPosts() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions =  { headers: {'Content-Type':'application/json'} };

    this.dataToSend = { 'iduser': this.iduser, 'token': localStorage.getItem('userToken') }
    this.http.post(this.requestsURL+'getLikedPosts/', this.dataToSend, requestOptions).subscribe(data => {
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
      this.getLikedPosts();
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
      this.getLikedPosts();
    }, error => {
      console.log(error);
    });
  }



  

}
