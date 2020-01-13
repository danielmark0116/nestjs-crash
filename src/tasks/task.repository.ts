import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./types/task.model";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new Task();

    newTask.title = createTaskDto.title;
    newTask.desc = createTaskDto.desc;
    newTask.taskStatus = TaskStatus.IN_PROGRESS;

    await newTask.save();

    return newTask;
  }
}
