export interface Questions {
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
