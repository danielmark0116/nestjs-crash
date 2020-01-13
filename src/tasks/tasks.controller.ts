import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksFilteredDto } from "./dto/task-filtered.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() tasksFilterDto: TasksFilteredDto): Task[] {
    if (Object.keys(tasksFilterDto).length === 0) {
      return this.tasksService.getAllTasks();
    }

    return this.tasksService.getFilteredTasks(tasksFilterDto);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("taskStatus") taskStatus: TaskStatus
  ) {
    this.tasksService.updateTaskStatus(id, taskStatus);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): void {
    this.tasksService.deleteTaskById(id);
  }
}
