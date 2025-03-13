import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './schemas/task.schema';

const mockTask = {
  _id: '123',
  title: 'Test Task',
  description: 'This is a test task',
  status: TaskStatus.PENDING,
};

const mockTasksService = {
  findAll: jest.fn().mockResolvedValue([mockTask]),
  findOne: jest.fn().mockResolvedValue(mockTask),
  create: jest.fn().mockResolvedValue(mockTask),
  update: jest.fn().mockResolvedValue(mockTask),
  delete: jest.fn().mockResolvedValue(mockTask),
};

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockTask]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single task', async () => {
    const result = await controller.findOne('123');
    expect(result).toEqual(mockTask);
    expect(service.findOne).toHaveBeenCalledWith('123');
  });

  it('should create a task', async () => {
    const dto: createTaskDto = { title: 'New Task', description: 'Test Desc', status: TaskStatus.PENDING };
    const result = await controller.create(dto);
    expect(result).toEqual(mockTask);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update a task', async () => {
    const dto: updateTaskDto = { title: 'Updated Task', description: 'Updated Desc', status: TaskStatus.COMPLETED };
    const result = await controller.update('123', dto);
    expect(result).toEqual(mockTask);
    expect(service.update).toHaveBeenCalledWith('123', dto);
  });

  it('should delete a task', async () => {
    const result = await controller.delete('123');
    expect(result).toEqual(mockTask);
    expect(service.delete).toHaveBeenCalledWith('123');
  });
});
