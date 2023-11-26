import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private isAuthenticated: boolean = false;


  private baseurl = 'http://localhost:3000/'; // Replace with your API URL

  getUser(){
    return this.http.get<boolean>("http://localhost:3000/user")
  }
  authenticate(email: string, password: string): Observable<boolean> {
    const authData = { email, password };
    return this.http.post<boolean>(`${this.baseurl}login`, authData);


  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }




} 

 

