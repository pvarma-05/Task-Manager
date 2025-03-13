import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task, TaskStatus } from './schemas/task.schema';
import { Model, Types } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockTask = {
  _id: new Types.ObjectId().toString(),
  title: 'Test Task',
  description: 'This is a test task',
  status: TaskStatus.PENDING,
};
const mockTaskModel = {
  find: jest.fn().mockResolvedValue([mockTask]),
  create: jest.fn().mockResolvedValue(mockTask), 
  findById: jest.fn().mockResolvedValue(mockTask),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockTask), 
  findByIdAndDelete: jest.fn().mockResolvedValue(mockTask), 
};

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockTask]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task when given a valid ID', async () => {
      const result = await service.findOne(mockTask._id);
      expect(result).toEqual(mockTask);
      expect(model.findById).toHaveBeenCalledWith(mockTask._id);
    });

    it('should throw BadRequestException if ID is invalid', async () => {
      await expect(service.findOne('invalid-id')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
      await expect(service.findOne(mockTask._id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const result = await service.create(mockTask as Task);
      expect(result).toEqual(mockTask);
      expect(model.create).toHaveBeenCalledWith(mockTask);
    });
  });

  describe('update', () => {
    it('should update and return the task', async () => {
      const result = await service.update(mockTask._id, mockTask);
      expect(result).toEqual(mockTask);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockTask._id, mockTask, { new: true });
    });

    it('should throw BadRequestException if ID is invalid', async () => {
      await expect(service.update('invalid-id', mockTask as Task)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
      await expect(service.update(mockTask._id, mockTask as Task)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete and return the task', async () => {
      const result = await service.delete(mockTask._id);
      expect(result).toEqual(mockTask);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockTask._id);
    });

    it('should throw BadRequestException if ID is invalid', async () => {
      await expect(service.delete('invalid-id')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(null);
      await expect(service.delete(mockTask._id)).rejects.toThrow(NotFoundException);
    });
  });
});
