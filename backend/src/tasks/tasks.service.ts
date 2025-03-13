import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    async findAll(): Promise<Task[]> {    
        return this.taskModel.find();
    }

    async findOne(id: string): Promise<Task> {
        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) {
            throw new BadRequestException(`Please Provide Correct ID`);
        }
        
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async create(dto: createTaskDto): Promise<Task> {
        return this.taskModel.create(dto); // ✅ Fix: Use .create() instead of `new this.taskModel()`
    }    

    async update(id: string, dto: updateTaskDto): Promise<Task> {
        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) {
            throw new BadRequestException(`Please Provide Correct ID`);
        }

        const updatedTask = await this.taskModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updatedTask) {
            throw new NotFoundException(`Update Failed`);
        }
        return updatedTask;
    }

    async delete(id: string): Promise<Task> {
        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) {
            throw new BadRequestException(`Please Provide Correct ID`);
        }

        const deletedTask = await this.taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            throw new NotFoundException(`Delete Failed`);
        }
        return deletedTask;
    }
}
