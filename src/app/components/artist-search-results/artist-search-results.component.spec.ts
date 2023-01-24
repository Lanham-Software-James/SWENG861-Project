import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchResultsComponent } from './artist-search-results.component';

describe('ArtistSearchResultsComponent', () => {
  let component: ArtistSearchResultsComponent;
  let fixture: ComponentFixture<ArtistSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
