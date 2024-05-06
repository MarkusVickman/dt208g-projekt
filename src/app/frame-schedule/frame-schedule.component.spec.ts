import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameScheduleComponent } from './frame-schedule.component';

describe('FrameScheduleComponent', () => {
  let component: FrameScheduleComponent;
  let fixture: ComponentFixture<FrameScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
