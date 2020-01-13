import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import * as uuid from "uuid/v1";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksFilteredDto } from "./dto/task-filtered.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(tasksFilteredDto: TasksFilteredDto): Task[] {
    const { search, status } = tasksFilteredDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task: Task) =>
          task.title.includes(search) || task.desc.includes(search)
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task: Task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID of ${id} does not exist`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, desc } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      desc,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): void {
    const taskToDelete = this.getTaskById(id);

    this.tasks = this.tasks.filter((task: Task) => task.id !== taskToDelete.id);
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus): void {
    const taskToUpdate = this.getTaskById(id);

    this.tasks = this.tasks.map((task: Task) => {
      if (task.id === taskToUpdate.id) {
        return { ...task, status: taskStatus };
      } else {
        return task;
      }
    });
  }
}
