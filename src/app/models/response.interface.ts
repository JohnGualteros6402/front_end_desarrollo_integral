export interface Response {
  idresponse: number;
  response: string;
  dateresponse: string;
  status: boolean;
  question: Questions;
  user: Users;
}

interface Questions {
  idquestion: number;
  statement: string;
  openingdate: string;
  closingdate: string;
  state: boolean;
  survey: survey;
}

interface survey {
  idsurvey: number;
  theme: string;
  status: boolean;
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
