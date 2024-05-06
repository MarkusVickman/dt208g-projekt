import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameSchedulePageComponent } from './frame-schedule-page.component';

describe('FrameSchedulePageComponent', () => {
  let component: FrameSchedulePageComponent;
  let fixture: ComponentFixture<FrameSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameSchedulePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
