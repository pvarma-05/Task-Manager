import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import * as mongoose from 'mongoose';

import { Query } from 'express-serve-static-core'

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private taskModel : mongoose.Model<Task>
    ){}

    async findAll(query: Query): Promise<Task[]> {

        const tasksPerPage = 2;
        const currentPage = Number(query.page) || 1
        const skipTasks = tasksPerPage * (currentPage - 1);


        const tasks = await this.taskModel.find().limit(tasksPerPage).skip(skipTasks);
        return tasks;
    }

    async findOne(id : string): Promise<Task> {
        const isValid = mongoose.isValidObjectId(id)
        if(!isValid) {
            throw new BadRequestException(`Please Provide Correct ID`)
        }
        
        const task = await this.taskModel.findById(id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
          }
          return task;
    }

    async create(task : Task): Promise<Task> {
        return this.taskModel.create(task)
    }

    async update(id : string,newtask:Task): Promise<Task> {

        const isValid = mongoose.isValidObjectId(id)
        if(!isValid) {
            throw new BadRequestException(`Please Provide Correct ID`)
        }

        const res = await this.taskModel.findByIdAndUpdate(id,newtask);
        if (!res) {
            throw new NotFoundException(`Update Failed`);
          }
          return res;
    }

    async delete(id : string): Promise<Task> {

        const isValid = mongoose.isValidObjectId(id)
        if(!isValid) {
            throw new BadRequestException(`Please Provide Correct ID`)
        }

        const res = await this.taskModel.findByIdAndDelete(id);
        if (!res) {
            throw new NotFoundException(`Delete Failed`);
          }
          return res;
    }

}
