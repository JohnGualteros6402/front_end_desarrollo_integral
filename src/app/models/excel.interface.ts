import { Questions } from './question.interface';
export interface DataExcel {
  usersTable: UserTable[];
  usersDetail: UserDetail[];
}

export interface ThemeExcel {
  themeTable: ThemeTable[];
}

export interface QuestionExcel {
  questionTable: QuestionTable[];
  questionDetail: QuestionDetail[];
}

export interface UserTable {
  iduser: number;
  numberdocument: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  numberphone: string;
}

export interface UserDetail {
  iduser: number;
  numberdocument: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  numberphone: string;
  landline: string;
  datebirth: string;
  municipality: string;
  stratum: string;
  academiclevel: string;
  sex: string;
  affiliationregime: string;
  disabilitycondition: string;
  ethnicity: string;
  technologicalaccess: string;
  role: string;
  urlImage: string;
}

export interface ThemeTable {
  idsurvey: number;
  theme: string;
  status: boolean;
}

export interface QuestionTable {
  idresponse: number;
  response: string;
  dateresponse: string;
  status: boolean;
  question: Questions;
  user: Users;
}

interface survey {
  idsurvey: number;
  theme: string;
  status: boolean;
}

export interface DataSection {
  keyColumnTitle: string;
  keyColumnValue: string;
  values: { key: string; value: unknown }[];
}

export interface DataSectionResponse {
  keyRowTitle: string;
  values: { key: string; value: unknown }[];
}

export interface QuestionDetail {
  idresponse: number;
  response: string;
  dateresponse: string;
  status: boolean;
  question: Questions;
  user: Users;
}

interface Users {
  iduser: number;
  numberdocument: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  numberphone: string;
  landline: string;
  datebirth: string;
  municipality: string;
  stratum: string;
  academiclevel: string;
  sex: string;
  affiliationregime: string;
  disabilitycondition: string;
  ethnicity: string;
  technologicalaccess: string;
  role: string;
  urlImage: string;
}
