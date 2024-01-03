import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: any[] = [
    { taskName: 'gym1', description: 'go gym', dueDate: '2024-01-08' },
    { taskName: 'gym', description: 'go gym', dueDate: '2024-01-09' },
    { taskName: 'walk', description: 'go for a walk', dueDate: '2024-01-04' },
    { taskName: 'walk1', description: 'go for a walk', dueDate: '2024-01-03' },
    { taskName: 'walk2', description: 'go for a walk', dueDate: '2024-01-05' },
    {
      taskName: 'meditate',
      description: 'go meditate',
      dueDate: '2024-01-05',
    },
    {
      taskName: 'meditate2',
      description: 'go meditate',
      dueDate: '2024-01-04',
    },
    {
      taskName: 'meditate3',
      description: 'go meditate',
      dueDate: '2024-01-07',
    },
    {
      taskName: 'write',
      description: 'go meditate',
      dueDate: '2024-01-06',
    },
    {
      taskName: 'write2',
      description: 'go meditate',
      dueDate: '2024-01-06',
    },
    {
      taskName: 'write3',
      description: 'go meditate',
      dueDate: '2024-01-06',
    },
    {
      taskName: 'write4',
      description: 'go meditate',
      dueDate: '2024-01-06',
    },
    {
      taskName: 'write5',
      description: 'go meditate',
      dueDate: '2024-01-06',
    },
    {
      taskName: 'write6',
      description: 'go meditate',
      dueDate: '2024-01-09',
    },
    {
      taskName: 'write7',
      description: 'go meditate',
      dueDate: '2024-01-09',
    },
  ];
  private tasksSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.tasksSubject.next([...this.tasks]);
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  addTask(task: any) {
    this.tasks.push(task);
    console.log('check', this.tasks);
    this.tasksSubject.next([...this.tasks]);
    console.log('check task sub', this.tasksSubject);
  }

  editTask(index: number, task: any) {
    this.tasks[index] = task;
    this.tasksSubject.next([...this.tasks]);
  }
  save(task: any, index: number) {
    console.log('service-', this.tasks);
    console.log('index', index);
    this.tasks[index] = task;
    console.log('after ', task);
    this.tasksSubject.next([...this.tasks]);
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.tasksSubject.next([...this.tasks]);
  }
}
