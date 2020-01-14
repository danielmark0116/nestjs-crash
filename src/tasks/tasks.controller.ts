import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./types/task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksFilteredDto } from "./dto/task-filtered.dto";
import { TaskStatusValidation } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getAllTasks(@Query() tasksFilterDto: TasksFilteredDto): Promise<Task[]> {
    return this.tasksService.getFilteredTasks(tasksFilterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(":id")
  @UsePipes(ParseIntPipe)
  getTaskById(@Param("id") id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Patch(":id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("taskStatus", new TaskStatusValidation()) newStatus: TaskStatus
  ): Promise<void> {
    return this.tasksService.upddateTaskStatus(id, newStatus);
  }

  @Delete(":id")
  @UsePipes(ParseIntPipe)
  deleteTaskById(@Param("id") id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
