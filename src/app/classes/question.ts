import { Survey } from "./survey";

export class Question {
  id: number;
  statement: string;
  openingDate: string;
  closingDate: string;
  state: boolean;
  survey: Survey;
}
