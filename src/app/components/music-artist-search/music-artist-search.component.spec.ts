import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { MatTabHarness } from '@angular/material/tabs/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MusicArtistSearchComponent } from './music-artist-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const EXPECTED_TABS = ['Search Track', 'Search Album', 'Search Artist'];

describe('MusicArtistSearchComponent', () => {
  let component: MusicArtistSearchComponent;
  let fixture: ComponentFixture<MusicArtistSearchComponent>;
  let compiled: HTMLElement;
  let loader: HarnessLoader;
  const expectedTabLabels = ['Search Track', 'Search Album', 'Search Artist'];
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicArtistSearchComponent ],
      imports: [ MatTabsModule, BrowserAnimationsModule, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicArtistSearchComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
    
    fixture.detectChanges();
  });

  it('should create the MusicArtistSearch component with proper markup in default state', async() => {
    const tabgroups = await loader.getAllHarnesses(MatTabGroupHarness);
    const tabs = await loader.getAllHarnesses(MatTabHarness);
    
    //Ensure component is rendered
    expect(component).toBeTruthy();

    //Ensure tab-group is rendered with correct properties
    expect(await tabgroups.length).toEqual(1);

    //Ensure tabs render with correct properties
    expect(await tabs.length).toEqual(3);
    tabs.forEach(async tab => {
      expect(EXPECTED_TABS.includes(await tab.getLabel())).toBeTrue();
    });

    expect(compiled.querySelectorAll('app-track-search-form')?.length).toBe(1);
    expect(compiled.querySelectorAll('app-track-search-results')?.length).toEqual(0);

    expect(compiled.querySelectorAll('app-artist-search-form')?.length).toBe(0);
    expect(compiled.querySelectorAll('app-artist-search-results')?.length).toEqual(0);

    expect(compiled.querySelectorAll('app-album-search-form')?.length).toBe(0);
    expect(compiled.querySelectorAll('app-album-search-results')?.length).toEqual(0);
  });

  it('should set track_searched to true, track_search_details to specified value, and render proper markup', async() => {
    const tabs = await loader.getAllHarnesses(MatTabHarness);
    await tabs[0].select();

    const testValue: TrackSearchOutput = {
      track_name: "Test Track",
      artist_name: "Test Artist"
    };

    component.searchTrack(testValue);

    expect(component.track_searched).toBeTrue();
    expect(component.track_search_details).toEqual(testValue);

    fixture.detectChanges();
    
    expect(compiled.querySelectorAll('app-track-search-form')?.length).toEqual(1);
    expect(compiled.querySelectorAll('app-track-search-results')?.length).toEqual(1);
  });
  
  it('should set artist_searched to true, artist_search_details to specified value, and render proper markup', async() => {
    const tabs = await loader.getAllHarnesses(MatTabHarness);
    await tabs[1].select();

    const testValue: ArtistSearchOutput = {
      artist_name: "Test Artist"
    };

    component.searchArtist(testValue);

    expect(component.artist_searched).toBeTrue();
    expect(component.artist_search_details).toEqual(testValue);

    fixture.detectChanges();
    
    expect(compiled.querySelectorAll('app-artist-search-form')?.length).toEqual(1);
    expect(compiled.querySelectorAll('app-artist-search-results')?.length).toEqual(1);
  });

  it('should set album_searched to true, album_search_details to specified value, and render proper markup', async() => {
    const tabs = await loader.getAllHarnesses(MatTabHarness);
    await tabs[2].select();

    const testValue: AlbumSearchOutput = {
      album_name: "Test Album"
    };

    component.searchAlbum(testValue);

    expect(component.album_searched).toBeTrue();
    expect(component.album_search_details).toEqual(testValue);

    fixture.detectChanges();
    
    expect(compiled.querySelectorAll('app-album-search-form')?.length).toEqual(1);
    expect(compiled.querySelectorAll('app-album-search-results')?.length).toEqual(1);
  });
});
