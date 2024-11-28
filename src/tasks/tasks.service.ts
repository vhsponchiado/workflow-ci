import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: { id: string; title: string }[] = [];

  findAll() {
    return this.tasks;
  }

  create(title: string) {
    const task = { id: Date.now().toString(), title };
    this.tasks.push(task);
    return task;
  }

  delete(id: string) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return null;
    return this.tasks.splice(index, 1);
  }
}
