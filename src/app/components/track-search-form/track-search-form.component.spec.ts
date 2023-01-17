import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSearchFormComponent } from './track-search-form.component';

describe('TrackSearchFormComponent', () => {
  let component: TrackSearchFormComponent;
  let fixture: ComponentFixture<TrackSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
