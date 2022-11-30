import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../classes/user';
import { environment } from 'src/environments/environment';
import { Users } from '../models/user.interface';
import { DataExcel, UserDetail, UserTable } from '../models/excel.interface';
import { UserImage } from '../models/userimage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:8090/api/v1/users';

  constructor(private httpClient: HttpClient) {}

  getListUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }
  findInformationUsers(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/information/${email}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }
  addUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, user);
  }
  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  sendEmail(email: string): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/forgotpassword/${email}`);
  }
  updatePassword(email: string, password: string): Observable<Object> {
    return this.httpClient.put(
      `${this.baseURL}/updatePassword/${email}`,
      password
    );
  }

  // Validation Users (LoginComponent)
  validationUser(email: string, password: string): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/${email}/${password}`);
  }

  validateAuthenticationAdmin() {
    if (localStorage.getItem('rol') != environment.admin) {
      return false;
    }
    return true;
  }
  validateAuthenticationUser() {
    if (localStorage.getItem('rol') != environment.citizen) {
      return false;
    }
    return true;
  }

  getUsers(): Observable<DataExcel> {
    return this.httpClient
      .get<Users[]>('http://localhost:8090/api/v1/users')
      .pipe(
        map((response) => {
          response.length = 51;
          const dataExcel: DataExcel = {
            usersTable: this.getUsersTable(response),
            usersDetail: this.getUsersDetail(response),
          };

          return dataExcel;
        })
      );
  }

  private getUsersTable(response: Users[]): UserTable[] {
    return response.map((item) => ({
      iduser: item.iduser,
      numberdocument: item.numberdocument,
      name: item.name,
      lastname: item.lastname,
      address: item.address,
      email: item.email,
      numberphone: item.numberphone,
    }));
  }

  private getUsersDetail(response: Users[]): UserDetail[] {
    return response.map((item) => ({
      iduser: item.iduser,
      numberdocument: item.numberdocument,
      name: item.name,
      lastname: item.lastname,
      address: item.address,
      email: item.email,
      numberphone: item.numberphone,
      landline: item.landline,
      datebirth: item.datebirth,
      municipality: item.municipality,
      stratum: item.stratum,
      academiclevel: item.academiclevel,
      sex: item.sex,
      affiliationregime: item.affiliationregime,
      disabilitycondition: item.disabilitycondition,
      ethnicity: item.ethnicity,
      technologicalaccess: item.technologicalaccess,
      role: item.role,
      urlImage: UserImage,
    }));
  }
}
