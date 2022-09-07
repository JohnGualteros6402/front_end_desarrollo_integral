import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../classes/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseURL = "http://localhost:8081/api/v1/question";

  constructor(private httpClient: HttpClient) {}

  getListQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${this.baseURL}`);
  }
  updateQuestion(id:number,question:Question) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,question);
  }
  getQuestionById(id:number): Observable<Question>{
    return this.httpClient.get<Question>(`${this.baseURL}/${id}`)
  }
  addQuestion(question: Question): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, question);
  }
  deleteQuestion(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
