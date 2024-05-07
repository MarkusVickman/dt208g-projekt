
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

export interface Courses {
  courseCode: string;
  subjectCode: string;
  level: string;
  progression: string;
  courseName: string;
  points: number;
  institutionCode: string;
  subject: string;
  syllabus: string;
}


export interface Subject {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, MatSelectModule, FormsModule]
})

export class CourseTableComponent implements OnInit/*, AfterViewInit */ {
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'add'];
  dataSource: MatTableDataSource<Courses> = new MatTableDataSource<Courses>();

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  public static Courses: Courses[] = [];
  public static FrameSchedule: Courses[] = [];
  public static filteredCourses: Courses[] = [];

  constructor(private GetCoursesService: GetCoursesService) { }

  ngOnInit() {
    this.GetCoursesService.getCourses().subscribe((data) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      CourseTableComponent.Courses = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    CourseTableComponent.RestoreMyCourses;
  }

  public static RestoreMyCourses() {
    CourseTableComponent.FrameSchedule = [];
    if (localStorage.length >= 1) {
      for (let i = 0; i < localStorage.length; i++) {
        // set key name
        const key: string = localStorage.key(i)!;
        // use key name to retrieve the corresponding value
        const value: string = localStorage.getItem(key)!;
        let newCourse: Courses = JSON.parse(value);
        CourseTableComponent.FrameSchedule.push(newCourse);
        console.log(CourseTableComponent.FrameSchedule);
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


  selected: string = '';

    selectFilter() {
      console.log(this.selected);
    CourseTableComponent.filteredCourses = CourseTableComponent.Courses.filter((Courses) => Courses.subject.includes(this.selected));
    this.dataSource = new MatTableDataSource(CourseTableComponent.filteredCourses);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

};

document.addEventListener('DOMContentLoaded', () => {
  const main: HTMLElement = document.getElementById("main") as HTMLElement;
  main.addEventListener("click", (e) => {
    if ((e.target as HTMLButtonElement).classList.contains('add')) {
      let test: string = (e.target as HTMLButtonElement).id;

      let result = CourseTableComponent.Courses.find(({ courseCode }) => courseCode === test) ?? /* default value */ null;

      if (result) {
        CourseTableComponent.FrameSchedule.push(result);
        //console.log(CourseTableComponent.FrameSchedule);
        //Localstorage sparar kursdatan
        localStorage.setItem(test, JSON.stringify(result));
        CourseTableComponent.RestoreMyCourses();

      }



      CourseTableComponent.Courses.forEach(course => {
        sessionStorage.setItem(course.subject, course.subject);
      })

      let testSubject: string[] = [];
      if (sessionStorage.length >= 1) {
        for (let i = 0; i < sessionStorage.length; i++) {
          // set key name
          const key: string = sessionStorage.key(i)!;
          // use key name to retrieve the corresponding value
          const value: string = sessionStorage.getItem(key)!;
          if (value) {
            testSubject.push(value);
          }

        }

      }
      console.log(sessionStorage);
    };

  });
});