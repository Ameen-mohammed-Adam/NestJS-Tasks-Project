import { TaskStatus } from '../tasks.model';

export class GetTaskFiltertDto {
  status?: TaskStatus;
  search?: string;
}
