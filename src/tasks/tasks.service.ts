import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repositry';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFiltertDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTaskFiltertDto): Promise<Task[]> {
    // const str = this.tasksRepository.helloWorld();
    return this.tasksRepository.getTasks(filterDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.findTaskById(id);
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }
  updateTaskStatus(
    id: string,
    updateTasStatuskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, updateTasStatuskDto);
  }
}
