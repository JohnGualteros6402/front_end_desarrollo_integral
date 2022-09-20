import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8081/api/v1/users";

  constructor(private httpClient: HttpClient) {}

  getListUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }
  findInformationUsers(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/information/${email}`);
  }

  updateUser(id:number,user:User) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,user);
  }
  getUserById(id:number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`)
  }
  addUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, user);
  }
  deleteUser(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  // Validation Users (LoginComponent)
  validationUser(email:string, password:string): Observable<Object>{
    return  this.httpClient.get(`${this.baseURL}/${email}/${password}`);
  }
}
