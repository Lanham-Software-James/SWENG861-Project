import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

import { MusicArtistSearchComponent } from './music-artist-search.component';

describe('MusicArtistSearchComponent', () => {
  let component: MusicArtistSearchComponent;
  let fixture: ComponentFixture<MusicArtistSearchComponent>;
  const expectedTabLabels = ['Search Track', 'Search Album', 'Search Artist'];

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

  it('should create the music-artist-search component', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-tab-group element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content section mat-tab-group')).toBeDefined();
  });

  it('should render mat-tab-group element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content section mat-tab-group')).toBeDefined();
  });

  it('should render correct mat-tab labels', () => {
    fixture.whenRenderingDone().then(() => {
      const tabLabels = document.querySelectorAll(
        '#menu .mat-tab-label-content'
      );
      Array.from(tabLabels).forEach(element => {
          let value: string = element.textContent !== null ? element.textContent : "";
          expect(expectedTabLabels).toContain(value);        
      });
    });
  });

  it('should render app-track-search-form element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-track-search-results element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-artist-search-form element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-artist-search-results element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-album-search-form element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-album-search-results element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should set track_searched to true and should set track_search_details to specified value', () => {
    const testValue: TrackSearchOutput = {
      track_name: "Test Track",
      artist_name: "Test Artist"
    };

    component.searchTrack(testValue);

    expect(component.track_searched == true && component.track_search_details == testValue);
  });
  
  it('should set artist_searched to true and should set artist_search_details to specified value', () => {
    const testValue: ArtistSearchOutput = {
      artist_name: "Test Artist"
    };

    component.searchArtist(testValue);

    expect(component.artist_searched == true && component.artist_search_details == testValue);
  });

  it('should set album_searched to true and should set album_search_details to specified value', () => {
    const testValue: AlbumSearchOutput = {
      album_name: "Test Album"
    };

    component.searchAlbum(testValue);

    expect(component.album_searched == true && component.album_search_details == testValue);
  });
});
