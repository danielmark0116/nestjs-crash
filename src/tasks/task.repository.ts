import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./types/task.model";
import { TasksFilteredDto } from "./dto/task-filtered.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getFilteredTasks(tasksFilteredDto: TasksFilteredDto): Promise<Task[]> {
    const { search, status } = tasksFilteredDto;

    const query = this.createQueryBuilder("task");

    if (status) {
      query.andWhere("task.taskStatus = :status", { status });
    }

    if (search) {
      query.andWhere(
        "(Lower(task.title) LIKE :search OR Lower(task.desc) LIKE :search)",
        {
          search: `%${search.toLowerCase()}%`
        }
      );
    }

    query.orderBy("task.createdAt", "DESC");

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new Task();

    newTask.title = createTaskDto.title;
    newTask.desc = createTaskDto.desc;
    newTask.taskStatus = TaskStatus.OPEN;

    await newTask.save();

    return newTask;
  }
}
