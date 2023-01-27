import { HarnessLoader } from '@angular/cdk/testing/component-harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { Observable, of } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistSearchResponse, LastFmApiService } from 'src/app/services/last-fm-api.service';

import { ArtistSearchResultsComponent } from './artist-search-results.component';

const TEST_ARTIST : Artist = {
  name: "Test Artist",
  url: "www.test.test"
};

class MockLastFmApiService extends LastFmApiService {
  public override artistSearch(artist: string, page?: number, limit?: number): Observable<ArtistSearchResponse> {
    const testResponse : ArtistSearchResponse = {
      results : {
        "opensearch:startIndex": 0,
        "opensearch:totalResults": 1,
        artistmatches: {
          artist: [TEST_ARTIST]
        }
      }
    }

    return of(testResponse);
  }
}

describe('ArtistSearchResultsComponent', () => {
  let component: ArtistSearchResultsComponent;
  let fixture: ComponentFixture<ArtistSearchResultsComponent>;
  let last_fm_api_service: MockLastFmApiService;
  let compiled: HTMLElement;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchResultsComponent ],
      imports: [ MatCardModule, MatPaginatorModule, MatIconModule ],
      providers: [ { provide: LastFmApiService, useClass: MockLastFmApiService },
                   { provide: HttpClient, useClass: jasmine.createSpy('HttpClient')}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSearchResultsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    loader = TestbedHarnessEnvironment.loader(fixture);

    last_fm_api_service = TestBed.inject(LastFmApiService);

    component.artists = [TEST_ARTIST];

    component.artist_search_details = {
      artist_name: TEST_ARTIST.name
    };

    fixture.detectChanges();
  });

  it('should create TrackSearchResults component with correct markup', async() => {
    const cards = await loader.getAllHarnesses(MatCardHarness);
    const icons = await loader.getAllHarnesses(MatIconHarness);
    const paginator = await loader.getAllHarnesses(MatPaginatorHarness);
    
    //Ensure component is created
    expect(component).toBeTruthy();

    //Ensure cards render with correct properties
    expect(await cards.length).toEqual(1);
    expect(await cards[0].getTitleText()).toEqual(component.artists[0].name);

    //Ensure Icon render with correct properties
    expect(await icons.length).toEqual(1);
    expect(await icons[0].getName()).toEqual("link");
    expect(compiled.querySelector('mat-card mat-card-header a')?.getAttribute('href')).toBe(component.artists[0].url);

    //Ensure paginator renders with correct properties
    expect((await paginator.length)).toEqual(1);
    expect((await paginator[0].getPageSize())).toEqual(10);
  });

  it('should return a list of artists length 1 equal to TEST_ARTIST when getArtists() is called', () => {
    component.getArtists(1);
    expect(component.artists.length).toEqual(1);
    expect(component.artists[0]).toEqual(TEST_ARTIST);
  });

  it('should return a list of artists length 1 equal to TEST_ARTIST and pageSize should equal test value when pageChange() is called', () => {    
    const testPage = {
      pageIndex: 1,
      pageSize: 10,
      length: 10
    }
    
    component.pageChange(testPage);
    expect(component.pageSize).toEqual(testPage.pageSize);
    expect(component.artists.length).toEqual(1);
    expect(component.artists[0]).toEqual(TEST_ARTIST);
  });

  it('should return a list of artists length 1 equal to TEST_ARTIST ngOnChanges() is called', () => {    
    const changes: SimpleChanges = {};
    
    component.ngOnChanges(changes);
    expect(component.artists.length).toEqual(1);
    expect(component.artists[0]).toEqual(TEST_ARTIST);
  });
});
