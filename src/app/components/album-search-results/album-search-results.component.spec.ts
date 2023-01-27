import { HarnessLoader } from '@angular/cdk/testing';
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
import { Album } from 'src/app/interfaces/album';
import { AlbumSearchResponse, LastFmApiService } from 'src/app/services/last-fm-api.service';

import { AlbumSearchResultsComponent } from './album-search-results.component';

const TEST_ALBUM : Album = {
  name: "Test Album",
  artist: "Test Artist",
  url: "www.test.test"
};

class MockLastFmApiService extends LastFmApiService {

  public override albumSearch(album: string, page?: number, limit?: number): Observable<AlbumSearchResponse> {
    const testResponse : AlbumSearchResponse = {
      results : {
        "opensearch:startIndex": 0,
        "opensearch:totalResults": 1,
        albummatches: {
          album: [TEST_ALBUM]
        }
      }
    }
    
    return of(testResponse);
  }
}

describe('AlbumSearchResultsComponent', () => {
  let component: AlbumSearchResultsComponent;
  let fixture: ComponentFixture<AlbumSearchResultsComponent>;
  let last_fm_api_service: MockLastFmApiService;
  let compiled: HTMLElement;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumSearchResultsComponent ],
      imports: [ MatCardModule, MatPaginatorModule, MatIconModule ],
      providers: [ { provide: LastFmApiService, useClass: MockLastFmApiService },
                   { provide: HttpClient, useClass: jasmine.createSpy('HttpClient')}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSearchResultsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    loader = TestbedHarnessEnvironment.loader(fixture);

    last_fm_api_service = TestBed.inject(LastFmApiService);

    component.albums = [TEST_ALBUM];

    component.album_search_details = {
      album_name: TEST_ALBUM.name
    };
    
    fixture.detectChanges();
  });

  it('should create AlbumSearchResults component with correct markup', async() => {
    const cards = await loader.getAllHarnesses(MatCardHarness);
    const icons = await loader.getAllHarnesses(MatIconHarness);
    const paginator = await loader.getAllHarnesses(MatPaginatorHarness);
    
    //Ensure component is created
    expect(component).toBeTruthy();

    //Ensure cards render with correct properties
    expect(await cards.length).toEqual(1);
    expect(await cards[0].getTitleText()).toEqual(component.albums[0].name);
    expect(await cards[0].getSubtitleText()).toEqual(component.albums[0].artist);

    //Ensure Icon render with correct properties
    expect(await icons.length).toEqual(1);
    expect(await icons[0].getName()).toEqual("play_circle_outline");
    expect(compiled.querySelector('mat-card mat-card-header a')?.getAttribute('href')).toBe(component.albums[0].url);

    //Ensure paginator renders with correct properties
    expect((await paginator.length)).toEqual(1);
    expect((await paginator[0].getPageSize())).toEqual(10);
  });

  it('should return a list of albums length 1 equal to TEST_ALBUM when getAlbums() is called', () => {
    component.getAlbums(1);
    expect(component.albums.length).toEqual(1);
    expect(component.albums[0]).toEqual(TEST_ALBUM);
  });

  it('should return a list of albums length 1 equal to TEST_ALBUM and pageSize should equal test value when pageChange() is called', () => {    
    const testPage = {
      pageIndex: 1,
      pageSize: 10,
      length: 10
    }
    
    component.pageChange(testPage);
    expect(component.pageSize).toEqual(testPage.pageSize);
    expect(component.albums.length).toEqual(1);
    expect(component.albums[0]).toEqual(TEST_ALBUM);
  });

  it('should return a list of albums length 1 equal to TEST_ALBUM ngOnChanges() is called', () => {    
    const changes: SimpleChanges = {};
    
    component.ngOnChanges(changes);
    expect(component.albums.length).toEqual(1);
    expect(component.albums[0]).toEqual(TEST_ALBUM);
  });
});
