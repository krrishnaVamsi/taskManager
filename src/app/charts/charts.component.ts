import { Component, OnInit } from '@angular/core';
// import { ChartOptions } from 'ng-apexcharts';
// import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexXAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
  imports: [NgApexchartsModule, NavbarComponent],
})
export class ChartsComponent implements OnInit {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  chart: ApexChart;
  fill: ApexFill;
  colors: string[];
  today = new Date();
  tasks: any;
  dateCount = 0;

  constructor(private taskService: TaskService) {}

  getFormattedDate(i: number) {
    const today = new Date();
    today.setDate(this.today.getDate() + i);
    // console.log(today);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day.toString();
    const formattedMonth = month < 10 ? '0' + month : month.toString();
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    // console.log(formattedDate);
    // today.setDate(today.getDate());
    return formattedDate;
  }
  countPerDay(date: any) {
    this.tasks.forEach((task: any) => {
      if (task.dueDate == date) {
        this.dateCount = this.dateCount + 1;
      }
    });
    const returnCount = this.dateCount;
    this.dateCount = 0;
    return returnCount;
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.reverse();
    });
    this.title = { text: 'No of Tasks Due' };
    (this.colors = ['#ff006e']),
      (this.fill = {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#F55555', '#6078ea', '#9966CC'],
        },
      }),
      (this.series = [
        {
          name: 'No of Tasks Due',
          data: [
            this.countPerDay(this.getFormattedDate(0)),
            this.countPerDay(this.getFormattedDate(1)),
            this.countPerDay(this.getFormattedDate(2)),
            this.countPerDay(this.getFormattedDate(3)),
            this.countPerDay(this.getFormattedDate(4)),
            this.countPerDay(this.getFormattedDate(5)),
            this.countPerDay(this.getFormattedDate(6)),
          ],
        },
      ]);
    this.chart = {
      type: 'bar',
    };
    this.xaxis = {
      categories: [
        this.getFormattedDate(0),
        this.getFormattedDate(1),
        this.getFormattedDate(2),
        this.getFormattedDate(3),
        this.getFormattedDate(4),
        this.getFormattedDate(5),
        this.getFormattedDate(6),
      ],
    };
    // console.log('axis:' + this.xaxis);
  }
}
