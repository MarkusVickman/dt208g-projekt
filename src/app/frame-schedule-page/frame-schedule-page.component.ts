import { Component } from '@angular/core';
import { FrameScheduleComponent } from '../frame-schedule/frame-schedule.component';

@Component({
  selector: 'app-frame-schedule-page',
  templateUrl: './frame-schedule-page.component.html',
  styleUrl: './frame-schedule-page.component.scss',
  standalone: true,
  imports: [FrameScheduleComponent]
})
export class FrameSchedulePageComponent {

}
