//Sida som innehåller komponent med tabell över alla kurser
import { Component } from '@angular/core';
import { CourseTableComponent } from '../course-table/course-table.component';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss',
  standalone: true,
  imports: [CourseTableComponent]
})
export class CoursePageComponent {

}
