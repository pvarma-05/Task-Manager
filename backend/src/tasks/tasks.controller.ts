import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('tasks') // /tasks
export class TasksController {
    constructor(private tasksService : TasksService){}
    // GET      /tasks          Fetch All Tasks
    // GET      /tasks/:id      Fetch Single Task By ID
    // POST     /tasks/         Create a New Task
    // PUT      /tasks/:id      Update a Task
    // DELETE   /tasks/:id      Delete a Task
    

    @Get()
    findAll(@Query() query:ExpressQuery):Promise<Task[]>{
        return this.tasksService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id:string ):Promise<Task>{
        return this.tasksService.findOne(id);
    }

    @Post()
    create(@Body() task:createTaskDto):Promise<Task>{
        return this.tasksService.create(task);
    }

    @Put(':id')
    update(@Param('id') id:string,@Body() newTask:updateTaskDto):Promise<Task>{
        return this.tasksService.update(id,newTask)
    }

    @Delete(':id')
    delete(@Param('id') id:string):Promise<Task>{
        return this.tasksService.delete(id);
    }
}
