import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class GetTaskFiltertDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status!: TaskStatus;
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search!: string;
}
