import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './schemas/task.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Task',schema: taskSchema}])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
