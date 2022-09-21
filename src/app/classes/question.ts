import { Survey } from './survey';

export class Question {
  idquestion: number;
  statement: string;
  openingdate: string;
  closingdate: string;
  state: boolean;
  survey: Survey;
}
