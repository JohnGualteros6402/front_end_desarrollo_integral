import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../classes/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
<<<<<<< HEAD

  private baseURL = "http://localhost:8090/api/v1/question";
=======
  private baseURL = 'http://localhost:8081/api/v1/question';
>>>>>>> 8c0f3bc75b08200ec6aa80903bc4de40728f1a3b

  constructor(private httpClient: HttpClient) {}

  getListQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${this.baseURL}`);
  }
  updateQuestion(id: number, question: Question): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, question);
  }
  getQuestionById(id: number): Observable<Question> {
    return this.httpClient.get<Question>(`${this.baseURL}/${id}`);
  }
  addQuestion(question: Question): Observable<Object> {
    console.log(question);
    return this.httpClient.post(`${this.baseURL}`, question);
  }
  deleteQuestion(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
