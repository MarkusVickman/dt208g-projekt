import { Injectable } from '@angular/core';
import { Courses } from '../course-table/course-table.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetFrameScheduleService {

  Courses: Courses[] = [];
  constructor() { }

  getMyCourses()/*: Observable<Courses[]>*/ {
    this.Courses = [];
    if (localStorage.length >= 1) {
      for (let i = 0; i < localStorage.length; i++) {
        // set key name
        const key: string = localStorage.key(i)!;
        // use key name to retrieve the corresponding value
        const value: string = localStorage.getItem(key)!;
        let newCourse: Courses = JSON.parse(value);
        this.Courses.push(newCourse);
      }
    }
    return of(this.Courses);
  }
};
