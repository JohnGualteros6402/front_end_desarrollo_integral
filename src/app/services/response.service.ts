import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../classes/question';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  constructor(private httpClient: HttpClient) {}
  private baseURL = 'http://localhost:8090/api/v1/response';

  getListQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${this.baseURL}`);
  }
  changeStatusQuestion(id: number, question: Question): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, question);
  }
  getQuestionById(id: number): Observable<Question> {
    return this.httpClient.get<Question>(`${this.baseURL}/${id}`);
  }
  addQuestion(question: any): Observable<Object> {
    console.log(question);
    return this.httpClient.post(`${this.baseURL}`, question);
  }
  deleteQuestion(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
