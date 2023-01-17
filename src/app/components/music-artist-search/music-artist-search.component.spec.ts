import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicArtistSearchComponent } from './music-artist-search.component';

describe('MusicArtistSearchComponent', () => {
  let component: MusicArtistSearchComponent;
  let fixture: ComponentFixture<MusicArtistSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicArtistSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicArtistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
