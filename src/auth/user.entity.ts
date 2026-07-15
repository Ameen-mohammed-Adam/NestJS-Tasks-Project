import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true })
  username!: string;
  @Column()
  password!: string;
  @OneToMany(() => Task, (tasks) => tasks.user, { eager: true })
  tasks!: Task[];
}
