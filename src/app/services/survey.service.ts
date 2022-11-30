import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Survey } from '../classes/survey';
import { ThemeExcel, ThemeTable } from '../models/excel.interface';
import { Themes } from '../models/theme.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private baseURL = 'http://localhost:8090/api/v1/survey';

  constructor(private httpClient: HttpClient) {}

  getListSurveys(): Observable<Survey[]> {
    return this.httpClient.get<Survey[]>(`${this.baseURL}`);
  }
  changeStatusSurvey(id: number, survey: Survey): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, survey);
  }
  getSurveyById(id: number): Observable<Survey> {
    return this.httpClient.get<Survey>(`${this.baseURL}/${id}`);
  }
  addSurvey(Survey: Survey): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, Survey);
  }
  deleteSurvey(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getThemes(): Observable<ThemeExcel> {
    return this.httpClient
      .get<Themes[]>('http://localhost:8090/api/v1/survey')
      .pipe(
        map((response) => {
          response.length = 5;
          const dataExcel: ThemeExcel = {
            themeTable: this.getThemesTable(response),
          };
          return dataExcel;
        })
      );
  }

  private getThemesTable(response: Themes[]): ThemeTable[] {
    return response.map((item) => ({
      idsurvey: item.idsurvey,
      theme: item.theme,
      status: item.status,
    }));
  }
}
