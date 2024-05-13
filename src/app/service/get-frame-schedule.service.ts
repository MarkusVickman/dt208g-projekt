//Service för att hämta kursdata som är lagrat i localstorage (egen valda)
import { Injectable } from '@angular/core';
import { Courses } from '../course-table/course-table.component';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Klass för att hämta kursdata från localstorage
export class GetFrameScheduleService {
  //Variabel för kursdata
  Courses: Courses[] = [];
  constructor() { }

  //Metod som hämtar data från localstorage och returnerar courses
  getMyCourses() {
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
