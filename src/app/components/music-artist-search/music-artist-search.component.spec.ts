import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

import { MusicArtistSearchComponent } from './music-artist-search.component';

describe('MusicArtistSearchComponent', () => {
  let component: MusicArtistSearchComponent;
  let fixture: ComponentFixture<MusicArtistSearchComponent>;
  let compiled: HTMLElement;
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
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    
  });

  it('should create the music-artist-search component', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-tab-group element', () => {
    expect(compiled.querySelector('.content section mat-tab-group')).toBeDefined();
  });

  it('should render mat-tab-group element', () => {
    expect(compiled.querySelector('.content section mat-tab-group')).toBeDefined();
  });

  it('should render correct mat-tab labels', () => {
    const tabLabels = compiled.querySelectorAll('#menu .mat-tab-label-content');

    let test: boolean = true;

    tabLabels.forEach(element => {
      let value: string = element.textContent !== null ? element.textContent : "";
      
      if(!expectedTabLabels.includes(value)){
        test = false;
      }
    });    

    expect(test).toBeTrue();
  });

  it('should render app-track-search-form element', () => {
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-track-search-results element', () => {
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-artist-search-form element', () => {
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-artist-search-results element', () => {
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-album-search-form element', () => {
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should render app-album-search-results element', () => {
    expect(compiled.querySelector('app-track-search-form')).toBeDefined();
  });

  it('should set track_searched to true and should set track_search_details to specified value', () => {
    const testValue: TrackSearchOutput = {
      track_name: "Test Track",
      artist_name: "Test Artist"
    };

    component.searchTrack(testValue);

    expect(component.track_searched == true && component.track_search_details == testValue).toBeTrue();
  });
  
  it('should set artist_searched to true and should set artist_search_details to specified value', () => {
    const testValue: ArtistSearchOutput = {
      artist_name: "Test Artist"
    };

    component.searchArtist(testValue);

    expect(component.artist_searched == true && component.artist_search_details == testValue).toBeTrue();
  });

  it('should set album_searched to true and should set album_search_details to specified value', () => {
    const testValue: AlbumSearchOutput = {
      album_name: "Test Album"
    };

    component.searchAlbum(testValue);

    expect(component.album_searched == true && component.album_search_details == testValue).toBeTrue();
  });
});
