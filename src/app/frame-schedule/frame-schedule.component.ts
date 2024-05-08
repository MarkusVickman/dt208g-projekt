import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GetCoursesService } from '../service/get-courses.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { GetFrameScheduleService } from '../service/get-frame-schedule.service';
import { Courses } from '../models/Courses';


export interface Subject {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-frame-schedule',
  templateUrl: './frame-schedule.component.html',
  styleUrl: './frame-schedule.component.scss',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, MatSelectModule, FormsModule, NgFor]
})


export class FrameScheduleComponent implements AfterViewInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'add'];
  dataSource: MatTableDataSource<Courses> = new MatTableDataSource<Courses>();

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  public static Courses: Courses[] = [];
  //public static FrameSchedule: Courses[] = [];
  public static filteredCourses: Courses[] = [];
  selected: string = "";
  subjects: string[] = [];
  totalPoints: number = 0;


  constructor(private GetFrameScheduleService: GetFrameScheduleService) { }

  ngAfterViewInit() {
    this.GetFrameScheduleService.getMyCourses().subscribe((data) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      FrameScheduleComponent.Courses = data;

      this.readSubject();
      console.log(FrameScheduleComponent.Courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.calculateTotal();
      this.remove();
    })
  }

  calculateTotal(){
    this.totalPoints = 0;
    for (let i = 0; i < FrameScheduleComponent.Courses.length; i++){
      this.totalPoints = this.totalPoints + FrameScheduleComponent.Courses[i].points;
    };
  }

  remove() {
    const main: HTMLElement = document.getElementById("main") as HTMLElement;
    main.addEventListener("click", (e) => {
      if ((e.target as HTMLButtonElement).classList.contains('remove')) {
        let test: string = (e.target as HTMLButtonElement).id;

        //let result = FrameScheduleComponent.Courses.find(({ courseCode }) => courseCode === test) ?? /* default value */ null;

        //if (result) {
        //FrameScheduleComponent.FrameSchedule.push(result);
        //Localstorage sparar kursdatan
        localStorage.removeItem(test);
        this.ngAfterViewInit();

        //}
      };
    });
  }

  private readSubject(): void {
    for (let i = 0; i < FrameScheduleComponent.Courses.length; i++) {
      if (this.subjects.includes(FrameScheduleComponent.Courses[i].subject) == false) {
        this.subjects.push(FrameScheduleComponent.Courses[i].subject);
      }
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectFilter() {
    FrameScheduleComponent.filteredCourses = FrameScheduleComponent.Courses.filter((Courses) => Courses.subject.includes(this.selected));
    this.dataSource = new MatTableDataSource(FrameScheduleComponent.filteredCourses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
};