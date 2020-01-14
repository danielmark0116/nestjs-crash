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

  async getFilteredTasks(tasksFilteredDto: TasksFilteredDto): Promise<Task[]> {
    const found = await this.taskRepository.getFilteredTasks(tasksFilteredDto);

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async upddateTaskStatus(id: number, newStatus: TaskStatus): Promise<void> {
    const updated = await this.taskRepository.update(
      { id },
      { taskStatus: newStatus }
    );

    if (updated.affected === 0) {
      throw new NotFoundException();
    }
  }

  async deleteTaskById(id: number): Promise<void> {
    const deleted = await this.taskRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
  }
}
