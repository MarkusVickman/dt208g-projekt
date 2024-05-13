//Service för att hämta all kursdata som webbplatsen använder
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from '../models/Courses';


@Injectable({
  providedIn: 'root'
})

//Klass för att hämta kurser med HttpClient
export class GetCoursesService {
  url: string = `https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json`;

  constructor(private http: HttpClient) {}

  //Metod som används för att hämta och returnera kursdata
  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.url);
}
}
