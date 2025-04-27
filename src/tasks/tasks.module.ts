import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskListsModule } from '../task-lists/task-lists.module';

@Module({
  imports: [TaskListsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
