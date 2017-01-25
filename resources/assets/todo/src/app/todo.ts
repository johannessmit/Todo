export class Todo {
  id: number;
  todo: string;
  status: number;

  static UNDONE = 0;
  static DONE = 1;
  static DELETED = 2;
}