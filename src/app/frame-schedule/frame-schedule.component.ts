/*Component för tabell över valda kurser.*/
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { GetFrameScheduleService } from '../service/get-frame-schedule.service';
import { Courses } from '../models/Courses';

@Component({
  selector: 'app-frame-schedule',
  templateUrl: './frame-schedule.component.html',
  styleUrl: './frame-schedule.component.scss',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, MatSelectModule, FormsModule, NgFor]
})

//Class för all hantering av formuläret.
export class FrameScheduleComponent implements AfterViewInit {

  //Knyter ihop kolumnerna med de som skapas i html. Här bestäms namn och antal.
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'add', 'showmore'];

  //Variabel med data över alla kurser som även innehåller information om bland annat filtrering och sortering.
  dataSource: MatTableDataSource<Courses> = new MatTableDataSource<Courses>();

  //Hantering av paginering och sortering
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  //variabler för alla kurser, filtrerade kurser, vad som sparas till ramschema.
  private Courses: Courses[] = [];
  private filteredCourses: Courses[] = [];
  //Variabel för vald kategori och en med lista över alla tillgängliga kategorier
  public selected: string = "";
  public subjects: string[] = [];
  //Variabel totalt antal poäng i listan och antal kurser i listan
  public totalPoints: number = 0;
  public numberOfCourses: number = 0;

  //Konstruktor som hämtar data med från en service som använder localStorage 
  constructor(private GetFrameScheduleService: GetFrameScheduleService) { }

  //"Huvudklassen" som efter vyinitiering initierar data prenumeration och tilldelar den datan till dataSource och en extra kurslista. 
  public ngAfterViewInit(): void {
    this.GetFrameScheduleService.getMyCourses().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.Courses = data;

      //Paginering och sortering initieras.
      this.readSubject();
      //Metoden readSubject körs för att läsa in hela listan med ämnen
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //Metoder för att räkna antal poäng och kurser
      this.calculateTotal();
      this.countCourses();
    })
  }

  //Metoder för att räkna antal poäng
  private calculateTotal(): void {
    this.totalPoints = 0;
    for (let i = 0; i < this.Courses.length; i++) {
      this.totalPoints = this.totalPoints + this.Courses[i].points;
    };
  }

  //Metoder för att räkna antal kurser
  private countCourses(): void {
    this.numberOfCourses = 0;
    this.numberOfCourses = this.Courses.length;
  }

  //Metod som bygger upp en lista/popup-ruta för extra info om kurser i mobilläget
  public showMore(test: string): void {
    const main: HTMLElement = document.getElementById("main") as HTMLElement;
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

      /*Knapp för att ta bort kurs från listan. Identifieras med att knapp id är kursid*/
      let button = document.createElement("button");
      let buttonText = document.createTextNode("Ta bort");
      button.appendChild(buttonText);
      button.id = result.courseCode;
      button.classList.add("remove-two");
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

    //Eventlisteners för stängaknapp och tabort i mobilläget
    main.addEventListener("click", (e) => {
      if ((e.target as HTMLButtonElement).classList.contains('close')) {
        readMore!.style.display = "none";
        closingDiv!.style.display = "none";
      }
      if ((e.target as HTMLButtonElement).classList.contains('remove-two')) {
        let test: string = (e.target as HTMLButtonElement).id;
        this.remove(test);
      }
    })
  }

  //Metod för att tabort kurs från listan med hjälp av kursid som föäjer med som parameter
  public remove(test: string): void {
    const readMore = document.getElementById("read-more");
    const closingDiv = document.getElementById("closingDiv");

    readMore!.style.display = "none";
    closingDiv!.style.display = "none";
    //Localstorage sparar kursdatan
    localStorage.removeItem(test);
    this.ngAfterViewInit();
  };

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