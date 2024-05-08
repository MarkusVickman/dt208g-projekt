import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from '../models/Courses';


@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {
  url: string = `https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.url);
}
}
