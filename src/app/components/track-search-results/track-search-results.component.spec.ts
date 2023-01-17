import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSearchResultsComponent } from './track-search-results.component';

describe('TrackSearchResultsComponent', () => {
  let component: TrackSearchResultsComponent;
  let fixture: ComponentFixture<TrackSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
