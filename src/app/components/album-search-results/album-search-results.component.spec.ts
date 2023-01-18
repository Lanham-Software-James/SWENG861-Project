import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSearchResultsComponent } from './album-search-results.component';

describe('AlbumSearchResultsComponent', () => {
  let component: AlbumSearchResultsComponent;
  let fixture: ComponentFixture<AlbumSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
