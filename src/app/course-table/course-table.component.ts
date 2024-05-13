/*Component för tabell över alla kurser.*/
//Import av allt som importeras.
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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

//Class för all hantering av formuläret.
export class CourseTableComponent implements AfterViewInit {
  
  //Knyter ihop kolumnerna med de som skapas i html. Här bestäms namn och antal.
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'add', 'show-more'];
  
  //Variabel med data över alla kurser som även innehåller information om bland annat filtrering och sortering.
  dataSource: MatTableDataSource<Courses> = new MatTableDataSource<Courses>();
  
  //Hantering av paginering och sortering
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  //variabler för alla kurser, filtrerade kurser, vad som sparas till ramschema.
  private Courses: Courses[] = [];
  private FrameSchedule: Courses[] = [];
  private filteredCourses: Courses[] = [];
  
  //Variabel för vald kategori och en med lista över alla tillgängliga kategorier
  public selected: string = "";
  public subjects: string[] = [];

  //Konstruktor som hämtar data med från en service som använder httpClient 
  constructor(private GetCoursesService: GetCoursesService) { }

  //"Huvudklassen" som efter vyinitiering initierar data prenumeration och tilldelar den datan till dataSource och en extra kurslista. 
  public ngAfterViewInit(): void {
    this.GetCoursesService.getCourses().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.Courses = data;
      
      //Paginering och sortering initieras.
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      //Metoden readSubject körs för att läsa in hela listan med ämnen
      this.readSubject();
      
      //Metoden addtwo körs för att lägga till eventlisteners till popup rutan
      this.addtwo();
    })
  }

  //Metod som bygger upp en lista/popup-ruta för extra info om kurser i mobilläget
  public showMore(test: string): void {
    let readMore = document.getElementById("read-more");
    let closingDiv = document.getElementById("closingDiv");
    
    //Hämtar information om en kurs baserat på kurskod som bifogas som parametern test
    let result = this.Courses.find(({ courseCode }) => courseCode === test) ?? /* default value */ null;

    //DOM-manupulering för extra information till mobilläget 
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

      /*Knapp för att lägga till kursen till listan som använder klassen add-two 
      för att idenfiera knappen och kursid som titel för att lägga till rätt kurs.*/
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

      /*Stänga knapp med klassen close för att identifiera*/
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

      /*Ett p element med meddelande och kursid som id för att kunna identifiera och visa eller dölja meddelandet vid behov*/
      let message = document.createElement("p");
      message.id = result.courseCode;
      message.style.display = "none";
      let messageText = document.createTextNode("Kurs " + result.courseName + " är tillagd i ditt ramschema.");
      message.appendChild(messageText);

      readMore.appendChild(h3);
      readMore.appendChild(p0);
      readMore.appendChild(p1);
      readMore.appendChild(p2);
      readMore.appendChild(p3);
      readMore.appendChild(p4);
      readMore.appendChild(a0);
      readMore.appendChild(button);
      readMore.appendChild(button1);
      readMore.appendChild(message);
    }
  };

  //Klass som initieras från html med bifogad parameter. Ändrar stil på knappen och lägger till kurs till listan 
  public add(test: string): void {
    document.getElementById(test + "btn")!.classList.add('clickedButton');
    let result = this.Courses.find(({ courseCode }) => courseCode === test) ?? /* default value */ null;
    this.FrameSchedule.push(result!);

    //Localstorage sparar kursdatan
    localStorage.setItem(test, JSON.stringify(result!));
  }

  //klass med eventlisteners för att lägga till kurs i mobilläget och även stänga popup-rutan
  private addtwo(): void {
    document.addEventListener("click", (e) => {
      let readMore = document.getElementById("read-more");
      let closingDiv = document.getElementById("closingDiv");
      if ((e.target as HTMLButtonElement).classList.contains('close')) {
        readMore!.style.display = "none";
        closingDiv!.style.display = "none";
      }
      if ((e.target as HTMLButtonElement).classList.contains('add-two')) {
        let test: string = (e.target as HTMLButtonElement).title;
        document.getElementById(test)!.style.display = "block";
        this.add(test);
      }
    })
  }

  //Läsen in en array av ämnen som kan användas i valknappen i tabellen
  private readSubject(): void {
    for (let i = 0; i < this.Courses.length; i++) {
      if (this.subjects.includes(this.Courses[i].subject) == false) {
        this.subjects.push(this.Courses[i].subject);
      }
    }
  }

  //Lägger in filtret och initierar paginering från första sidan
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Metod som använder filtrering för att ändast visa valt ämne i tabellen och sen startar paginering.
  public selectFilter(): void {
    this.filteredCourses = this.Courses.filter((Courses) => Courses.subject.includes(this.selected));
    this.dataSource = new MatTableDataSource(this.filteredCourses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
};
