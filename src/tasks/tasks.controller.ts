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
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksFilteredDto } from "./dto/task-filtered.dto";
import { TaskStatusValidation } from "./pipes/task-status-validation.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  // you can usepipes below or use them inside @Query() like that:
  // @Query(ValidationPipe)
  @UsePipes(ValidationPipe)
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
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("taskStatus", new TaskStatusValidation()) taskStatus: TaskStatus
  ) {
    this.tasksService.updateTaskStatus(id, taskStatus);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): void {
    this.tasksService.deleteTaskById(id);
  }
}
