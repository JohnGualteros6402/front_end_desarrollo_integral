import { User } from './user';
import { Question } from './question';

export class Response {
  idresponse: number;
  response: string;
  dateresponse: string;
  status: boolean;
  question: Question;
  user: User;
}
