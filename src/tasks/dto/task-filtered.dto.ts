import { TaskStatus } from "../types/task.model";
import { IsOptional, IsNotEmpty, IsIn } from "class-validator";

export class TasksFilteredDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
