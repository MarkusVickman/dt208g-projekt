import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FrameSchedulePageComponent } from './frame-schedule-page/frame-schedule-page.component';

export const routes: Routes = [
  {path: 'home', component: StartPageComponent},
  {path: 'courses', component: CoursePageComponent},
  {path: 'frameschedule', component: FrameSchedulePageComponent},
  {path: '', component: StartPageComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

