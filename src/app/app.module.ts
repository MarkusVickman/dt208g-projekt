import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { FrameScheduleComponent } from './frame-schedule/frame-schedule.component';
import { CourseTableComponent } from './course-table/course-table.component';
import { FrameSchedulePageComponent } from './frame-schedule-page/frame-schedule-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FrameScheduleSmallComponent } from './frame-schedule-small/frame-schedule-small.component';

//Modules from Material UI
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderMenuComponent,
    CoursePageComponent,
    FrameSchedulePageComponent,
    FooterComponent
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
