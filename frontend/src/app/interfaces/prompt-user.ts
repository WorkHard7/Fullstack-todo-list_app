import {Todo} from "./todo";

export interface PromptUser {
  todo: Todo
  uuid?: string,
  message: string;
  title: string;
  type: string;
}
