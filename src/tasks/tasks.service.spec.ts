import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],  // Declarar o controller
      providers: [TasksService],       // Declarar o provider do serviço
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an empty array initially', () => {
    expect(service.findAll()).toEqual([]);
  });

  it('should create a task', () => {
    const title = 'Test Task';
    const task = service.create(title);
    expect(task).toHaveProperty('id');
    expect(task.title).toBe(title);
    expect(service.findAll()).toContainEqual(task);
  });

  it('should delete a task', () => {
    const title = 'Task to Delete';
    const task = service.create(title);
    const deleted = service.delete(task.id);
    expect(deleted).toEqual([task]);
    expect(service.findAll()).not.toContainEqual(task);
  });

  it('should return null when trying to delete a non-existent task', () => {
    expect(service.delete('non-existent-id')).toBeNull();
  });
});
