import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatabaseObjects } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsConfigService {

  apiBaseUrl = environment.apiBaseUrl;
  headers = new HttpHeaders({
    Authorization: sessionStorage.getItem('basicauth') ?? []
  });

  constructor(private http: HttpClient) { }

  getAll<T extends DatabaseObjects>(url: string): Observable<T[]> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /');
    }
    return this.http.get<T[]>(this.apiBaseUrl + url, {headers: this.headers});
  }

  get<T extends DatabaseObjects>(url: string, param: string|number): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.get<T>(this.apiBaseUrl + url + `/${param}`, {headers: this.headers});
  }

  post<T extends DatabaseObjects>(url: string, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.post<T>(this.apiBaseUrl + url, data, {headers: this.headers});
  }

  put<T extends DatabaseObjects>(url: string, param: string|number, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.put<T>(this.apiBaseUrl + url + `/${param}`, data, {headers: this.headers});
  }

  delete<T extends DatabaseObjects>(url: string, param: string|number) {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.delete<any>(this.apiBaseUrl + url + `/${param}`, {headers: this.headers});
  }

  isUrl(url: string): boolean {
    return /^\/[a-zA-Z0-9._/-]*$/.test(url);
  }
}
