import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  toggleNumber: boolean=false;
  // @Input() title: string;

  constructor(private router: Router) {
    console.log(this.toggleNumber);
    console.log(this.router.url);
  }
  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     if (this.router.url == '/task-form' || this.router.url == '') {
    //       this.toggleNumber = true;
    //       this.toggleContainer();
    //     } else if (this.router.url == '/charts') {
    //       this.toggleNumber = false;
    //       this.toggleContainer();
    //     }
    //     console.log('route event detected' + this.router.url);
    //   });
  }
  list() {
    this.router.navigate(['/task-form']);
    this.toggleNumber = false;
  }
  chart() {
    this.router.navigate(['/charts']);
    this.toggleNumber = true;
  }
  toggleContainer() {
    this.toggleNumber = !this.toggleNumber;

    if (this.toggleNumber) {
      this.toggleContainerStyle = {
        clipPath: 'inset(0 0 0 50%)',
        backgroundColor: '#D74046',
        color: '#000000',
      };

      this.chart();
    } else {
      this.toggleContainerStyle = {
        clipPath: 'inset(0 50% 0 0)',
        backgroundColor: 'dodgerblue',
      };
      this.list();
    }

    // console.log(this.toggleNumber);
  }
  toggleContainerStyle: { [key: string]: string } = {};
}
