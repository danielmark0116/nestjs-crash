import { TaskStatus } from "../task.model";

export class TasksFilteredDto {
  status: TaskStatus;
  search: string;
}
