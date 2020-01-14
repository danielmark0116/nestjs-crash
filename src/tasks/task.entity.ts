import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./types/task.model";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: TaskStatus.OPEN })
  taskStatus: TaskStatus;

  @Column({ default: Date.now() })
  createdAt: string;

  @Column({ default: new Date().toLocaleString() })
  dateString: string;
}
