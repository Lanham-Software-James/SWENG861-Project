import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { LastFmApiService, TrackSearchResponse } from 'src/app/services/last-fm-api.service';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';

import { TrackSearchResultsComponent } from './track-search-results.component';
import { Observable, of } from 'rxjs';
import { Track } from 'src/app/interfaces/track';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';


const TEST_TRACK : Track = {
  name: "Test Track",
  artist: "Test Artist",
  url: "www.test.test"
};

class MockLastFmApiService extends LastFmApiService {
  public override trackSearch(track_name: string, artist: string, page?: number, limit?: number): Observable<TrackSearchResponse> {
    const testResponse : TrackSearchResponse = {
      results : {
        "opensearch:startIndex": 0,
        "opensearch:totalResults": 1,
        trackmatches: {
          track: [TEST_TRACK]
        }
      }
    }
    
    return of(testResponse);
  }
}

describe('TrackSearchResultsComponent', () => {
  let component: TrackSearchResultsComponent;
  let fixture: ComponentFixture<TrackSearchResultsComponent>;
  let last_fm_api_service: MockLastFmApiService;
  let compiled: HTMLElement;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSearchResultsComponent ],
      imports: [ MatCardModule, MatPaginatorModule ],
      providers: [ { provide: LastFmApiService, useClass: MockLastFmApiService },
                   { provide: HttpClient, useClass: jasmine.createSpy('HttpClient')}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSearchResultsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    loader = TestbedHarnessEnvironment.loader(fixture);

    last_fm_api_service = TestBed.inject(LastFmApiService);

    component.tracks = [TEST_TRACK];

    component.track_search_details = {
      track_name: TEST_TRACK.name,
      artist_name: TEST_TRACK.artist
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of mat-card elements', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness);

    expect((await cards.length)).toEqual(1);
  });

  it('should render mat-card element with correct title', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness);

    expect((await cards[0].getTitleText())).toEqual(component.tracks[0].name);
  });

  it('should render mat-card element with correct sub-title', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness);

    expect((await cards[0].getSubtitleText())).toEqual(component.tracks[0].artist);
  });

  it('should render mat-card element with correct mat-icon', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness);
    const text = await cards[0].getText();

    expect((await text.includes("play_circle_outline"))).toBeTrue();
  });

  it('should render mat-card element with correct play button link', async () => {
    expect(compiled.querySelector('mat-card mat-card-header a')?.getAttribute('href')).toBe(component.tracks[0].url);
  });

  it('should render mat-paginator element with correct details', async () => {
    const paginator = await loader.getAllHarnesses(MatPaginatorHarness);

    expect((await paginator.length)).toEqual(1);
    expect((await paginator[0].getPageSize())).toEqual(10);
  });

  it('should return a list of tracks length 1 equal to TEST_TRACK when getTracks() is called', () => {
    component.getTracks(1);
    expect(component.tracks.length).toEqual(1);
    expect(component.tracks[0]).toEqual(TEST_TRACK);
  });

  it('should return a list of tracks length 1 equal to TEST_TRACK and pageSize should equal test value when pageChange() is called', () => {    
    const testPage = {
      pageIndex: 1,
      pageSize: 10,
      length: 10
    }
    
    component.pageChange(testPage);
    expect(component.pageSize).toEqual(testPage.pageSize);
    expect(component.tracks.length).toEqual(1);
    expect(component.tracks[0]).toEqual(TEST_TRACK);
  });

  it('should return a list of tracks length 1 equal to TEST_TRACK ngOnChanges() is called', () => {    
    const changes: SimpleChanges = {};
    
    component.ngOnChanges(changes);
    expect(component.tracks.length).toEqual(1);
    expect(component.tracks[0]).toEqual(TEST_TRACK);
  });
});
