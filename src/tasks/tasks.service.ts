import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksFilteredDto } from "./dto/task-filtered.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./types/task.model";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();

    return tasks;
  }

  async getFilteredTasks(tasksFilteredDto: TasksFilteredDto): Promise<any[]> {
    const { search, status } = tasksFilteredDto;

    return [];
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  //   getFilteredTasks(tasksFilteredDto: TasksFilteredDto): Task[] {
  //     const { search, status } = tasksFilteredDto;
  //     let tasks = this.getAllTasks();
  //     if (status) {
  //       tasks = tasks.filter((task: Task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter(
  //         (task: Task) =>
  //           task.title.includes(search) || task.desc.includes(search)
  //       );
  //     }
  //     return tasks;
  //   }
  //   getTaskById(id: string): Task {
  //     const found = this.tasks.find((task: Task) => task.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Task with ID of ${id} does not exist`);
  //     }
  //     return found;
  //   }
  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, desc } = createTaskDto;
  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       desc,
  //       status: TaskStatus.OPEN
  //     };
  //     this.tasks.push(task);
  //     return task;
  //   }
  //   deleteTaskById(id: string): void {
  //     const taskToDelete = this.getTaskById(id);
  //     this.tasks = this.tasks.filter((task: Task) => task.id !== taskToDelete.id);
  //   }
  //   updateTaskStatus(id: string, taskStatus: TaskStatus): void {
  //     const taskToUpdate = this.getTaskById(id);
  //     this.tasks = this.tasks.map((task: Task) => {
  //       if (task.id === taskToUpdate.id) {
  //         return { ...task, status: taskStatus };
  //       } else {
  //         return task;
  //       }
  //     });
  //   }
}
