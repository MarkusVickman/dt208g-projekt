import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameScheduleSmallComponent } from './frame-schedule-small.component';

describe('FrameScheduleSmallComponent', () => {
  let component: FrameScheduleSmallComponent;
  let fixture: ComponentFixture<FrameScheduleSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameScheduleSmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameScheduleSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
