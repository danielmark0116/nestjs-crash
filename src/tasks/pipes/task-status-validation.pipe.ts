import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidation implements PipeTransform {
  // you can even have constructor here to pass some additional values
  // after all it is just a normal class :)

  readonly validStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ];

  private isStatusValid(value: any): boolean {
    const idx = this.validStatuses.indexOf(value);

    return idx !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException("Invalid status");
    }

    return value;
  }
}
