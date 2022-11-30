import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from '../classes/question';
import {
  QuestionDetail,
  QuestionExcel,
  QuestionTable,
} from '../models/excel.interface';
import { Questions } from '../models/question.interface';
import { Response } from '../models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseURL = 'http://localhost:8090/api/v1/question';

  constructor(private httpClient: HttpClient) {}

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

  getQuestions(): Observable<QuestionExcel> {
    return this.httpClient
      .get<Response[]>('http://localhost:8090/api/v1/response')
      .pipe(
        map((response) => {
          response.length = 5;
          const dataExcel: QuestionExcel = {
            questionTable: this.getQuestionsTable(response),
            questionDetail: this.getQuestionsDetail(response),
          };
          return dataExcel;
        })
      );
  }

  private getQuestionsTable(response: Response[]): QuestionTable[] {
    return response.map((item) => ({
      idresponse: item.idresponse,
      response: item.response,
      dateresponse: item.dateresponse,
      status: item.status,
      question: item.question,
      user: item.user,
    }));
  }

  private getQuestionsDetail(response: Response[]): QuestionDetail[] {
    return response.map((item) => ({
      idresponse: item.idresponse,
      response: item.response,
      dateresponse: item.dateresponse,
      status: item.status,
      question: item.question,
      user: item.user,
    }));
  }
}
