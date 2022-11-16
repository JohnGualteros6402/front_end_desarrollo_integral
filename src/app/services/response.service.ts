import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../classes/response';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  constructor(private httpClient: HttpClient) {}
  private baseURL = 'http://localhost:8090/api/v1/response';

  getListResponses(): Observable<Response[]> {
    return this.httpClient.get<Response[]>(`${this.baseURL}`);
  }
  changeStatusResponse(id: number, response: Response): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, response);
  }
  getResponseById(id: number): Observable<Response> {
    return this.httpClient.get<Response>(`${this.baseURL}/${id}`);
  }
  addResponse(response: any): Observable<Object> {
    console.log(response);
    return this.httpClient.post(`${this.baseURL}`, response);
  }
  deleteResponse(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getResponsesUser(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/user/${id}`);
  }
}
