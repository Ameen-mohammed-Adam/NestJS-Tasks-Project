import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repositry';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFiltertDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';
@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTaskFiltertDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.findTaskById(id, user);
  }
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
  deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }
  updateTaskStatus(
    id: string,
    updateTasStatuskDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, updateTasStatuskDto, user);
  }
}
