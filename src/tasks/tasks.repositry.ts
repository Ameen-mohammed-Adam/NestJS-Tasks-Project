import 'reflect-metadata';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFiltertDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksRepository {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  async getTasks(filterDto: GetTaskFiltertDto): Promise<Task[]> {
    const query = this.repository.createQueryBuilder('task');
    const { status, search } = filterDto;
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      const loweredSearch = search.toLowerCase();
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${loweredSearch}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async findTaskById(id: string): Promise<Task> {
    const found = await this.repository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task Not Found For id ${id}`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.repository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.findTaskById(id);
    await this.repository.remove(task);
  }

  async updateTaskStatus(
    id: string,
    UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDto;
    const task = await this.findTaskById(id);
    task.status = status;
    return this.repository.save(task);
  }
}
