import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private router: Router) { }

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<any>(this.apiBaseUrl + '/users/signin', {headers}).pipe(
      map(response => {
        let basicauth = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('basicauth', basicauth);
        return response;
      })
    );
  }

  isLoggedIn() {
    let basicauth = sessionStorage.getItem('basicauth');
    return !(basicauth === null);
  }

  signout() {
    sessionStorage.removeItem('basicauth');
    this.router.navigate(['']);
  }
}
