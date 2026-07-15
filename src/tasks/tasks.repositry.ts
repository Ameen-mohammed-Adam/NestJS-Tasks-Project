import 'reflect-metadata';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFiltertDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';
@Injectable()
export class TasksRepository {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  async getTasks(filterDto: GetTaskFiltertDto, user: User): Promise<Task[]> {
    const query = this.repository.createQueryBuilder('task');
    const { status, search } = filterDto;
    query.where({ user });
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

  async findTaskById(id: string, user: User): Promise<Task> {
    if (!user) {
      throw new NotFoundException(`User not provided`);
    }
    const found = await this.repository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!found) {
      throw new NotFoundException(`Task Not Found For id ${id}`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.repository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    // const task = await this.findTaskById(id, user);
    const result = await this.repository.delete({ id, user: { id: user.id } });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} Not Found.`);
    }
  }

  async updateTaskStatus(
    id: string,
    UpdateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDto;
    const task = await this.findTaskById(id, user);
    task.status = status;
    return this.repository.save(task);
  }
}
