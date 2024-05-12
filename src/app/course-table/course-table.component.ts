
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

//Interface för att typsäkra objecthanteringen för kurser som hämtas i servicen getcourses
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

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, MatSelectModule, FormsModule, NgFor]
})

export class CourseTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'add', 'show-more'];
  dataSource: MatTableDataSource<Courses> = new MatTableDataSource<Courses>();

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  public static Courses: Courses[] = [];
  public static FrameSchedule: Courses[] = [];
  public static filteredCourses: Courses[] = [];
  selected: string = "";
  subjects: string[] = [];

  constructor(private GetCoursesService: GetCoursesService) { }

  ngAfterViewInit() {
    this.GetCoursesService.getCourses().subscribe((data) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      CourseTableComponent.Courses = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.readSubject();
      this.showMore();
    })
  }

  showMore() {
    const main: HTMLElement = document.getElementById("main") as HTMLElement;
    let readMore = document.getElementById("read-more");
    let closingDiv = document.getElementById("closingDiv");

    main.addEventListener("click", (e) => {
      if ((e.target as HTMLButtonElement).classList.contains('show-more')) {
        let test: string = (e.target as HTMLButtonElement).title;
        let result = CourseTableComponent.Courses.find(({ courseCode }) => courseCode === test) ?? /* default value */ null;

        if (result && readMore) {
          readMore!.style.display = "block";
          closingDiv!.style.display = "block";
          readMore.innerHTML = "";

          let points = result.points as unknown;

          let h3 = document.createElement("h3");
          let h3Text = document.createTextNode(result.courseName);
          h3.style.fontWeight = "500";
          h3.appendChild(h3Text);

          let p0 = document.createElement("p");
          let p0Text = document.createTextNode("Kurskod: " + result.courseCode);
          p0.style.fontWeight = "bold";
          p0.appendChild(p0Text);

          let p1 = document.createElement("p");
          let p1Text = document.createTextNode("Nivå: " + result.level);
          p1.appendChild(p1Text);

          let p2 = document.createElement("p");
          let p2Text = document.createTextNode("Poäng: " + points as string);
          p2.appendChild(p2Text);

          let p3 = document.createElement("p");
          let p3Text = document.createTextNode("Ämne: " + result.subject);
          p3.appendChild(p3Text);

          let p4 = document.createElement("p");
          let p4Text = document.createTextNode("Progression: " + result.progression);
          p4.appendChild(p4Text);

          let a0 = document.createElement("a");
          let a0Text = document.createTextNode("Kursplan");
          a0.appendChild(a0Text);
          a0.href = result.syllabus;
          a0.style.display = "block";

          let button = document.createElement("button");
          let buttonText = document.createTextNode("Lägg till");
          button.appendChild(buttonText);
          button.title = result.courseCode;
          button.classList.add("add-two");
          button.style.backgroundColor = "white";
          button.style.borderRadius = "5px";
          button.style.padding = "5px";
          button.style.borderWidth = "1px";
          button.style.borderColor = "black";
          button.style.margin = "10px";

          let button1 = document.createElement("button");
          let button1Text = document.createTextNode("Stäng");
          button1.appendChild(button1Text);
          button1.classList.add("close");
          button1.style.backgroundColor = "white";
          button1.style.borderRadius = "5px";
          button1.style.padding = "5px";
          button1.style.borderWidth = "1px";
          button1.style.borderColor = "black";
          button1.style.margin = "10px";

          readMore.appendChild(h3);
          readMore.appendChild(p0);
          readMore.appendChild(p1);
          readMore.appendChild(p2);
          readMore.appendChild(p3);
          readMore.appendChild(p4);
          readMore.appendChild(a0);
          readMore.appendChild(button);
          readMore.appendChild(button1);
        }
      }
      if ((e.target as HTMLButtonElement).classList.contains('close')) {
        readMore!.style.display = "none";
        closingDiv!.style.display = "none";
      }
    })
  };

  private readSubject(): void {
    for (let i = 0; i < CourseTableComponent.Courses.length; i++) {
      if (this.subjects.includes(CourseTableComponent.Courses[i].subject) == false) {
        this.subjects.push(CourseTableComponent.Courses[i].subject);
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
    CourseTableComponent.filteredCourses = CourseTableComponent.Courses.filter((Courses) => Courses.subject.includes(this.selected));
    this.dataSource = new MatTableDataSource(CourseTableComponent.filteredCourses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      document.getElementById((e.target as HTMLButtonElement).id)!.classList.add('clickedButton');
      let result = CourseTableComponent.Courses.find(({ courseCode }) => courseCode === test) ?? /* default value */ null;

        CourseTableComponent.FrameSchedule.push(result!);
        //Localstorage sparar kursdatan
        localStorage.setItem(test, JSON.stringify(result!));

    };
    if((e.target as HTMLButtonElement).classList.contains('add-two')){
      let test: string = (e.target as HTMLButtonElement).title;
      let result = CourseTableComponent.Courses.find(({ courseCode }) => courseCode === test) ?? /* default value */ null;
      CourseTableComponent.FrameSchedule.push(result!);
      //Localstorage sparar kursdatan
      localStorage.setItem(test, JSON.stringify(result!));

      let readMore = document.getElementById("read-more");
      let p0 = document.createElement("p");
      let p0Text = document.createTextNode("Kurs " + result!.courseName + " är tillagd i ditt ramschema.");
      p0.style.fontWeight = "500";
      p0.style.color = "blue";
      p0.appendChild(p0Text);

      readMore!.appendChild(p0);
    }
  });
});