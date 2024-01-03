import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any[] = [];
  toggleForm = true;
  editIndex: number;
  editToggle = false;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: Router
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
    });

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log('Initial load', this.tasks);
    });

    const today = new Date();
    console.log('Date:' + today);
  }
  editTask(task: any, index: number) {
    this.toggleForm = false;
    this.editToggle = true;
    this.editIndex = index;
    this.taskForm = new FormGroup({
      taskName: new FormControl(task.taskName),
      description: new FormControl(task.description),
      dueDate: new FormControl(task.dueDate),
    });
  }

  save() {
    // console.log(this.taskForm)
    this.taskService.save(this.taskForm.value, this.editIndex);
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.editToggle = false;
      // console.log(tasks)
    });
  }
  cancel() {
    this.editToggle = false;
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
    this.taskForm.reset();
  }
  AddNewTask() {
    this.taskForm.reset();
    this.editToggle = false;
    this.toggleForm = true;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Add or edit task based on the use case
      // For simplicity, assume we are always adding a new task
      // const task = { id: Date.now().toString(), ...this.taskForm.value };
      this.toggleForm = false;
      this.taskService.addTask(this.taskForm.value);
      console.log(this.taskService);
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks;
      });
      // this.route.navigate(['/task-list'])
      this.taskForm.reset();
    }
  }
}
