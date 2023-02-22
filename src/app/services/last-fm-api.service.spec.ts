/**
 * Test class for last fm api service
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AlbumSearchResponse, ArtistSearchResponse, LastFmApiService, TrackSearchResponse } from './last-fm-api.service';
import { Track } from '../interfaces/track';
import { Artist } from '../interfaces/artist';
import { Album } from '../interfaces/album';

//Test init
describe('LastFmApiService', () => {
  let service: LastFmApiService;
  let httpTestingController: HttpTestingController; //Using stub for http client

  //Test init
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LastFmApiService);
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  //Testing the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Testing trackSearch()
  it('should return list of type tracks', () => {
    const test_track: Track = {
      name: "Test Track",
      artist: "Test Artist",
      url: "Test Url"
    }

    const test_response: TrackSearchResponse = {
      results : {
        "opensearch:startIndex": 0,
        "opensearch:totalResults": 1,
        trackmatches: {
          track: [test_track]
        }
      }
    }

    service.trackSearch(test_track.name, test_track.artist).subscribe(response => {
      expect(response).toEqual(test_response);
    });
  });

  //Testing artistSearch()
  it('should return list of type artist', () => {
    const test_artist: Artist = {
      name: "Test Track",
      url: "Test Url"
    }

    const test_response: ArtistSearchResponse = {
      results : {
        "opensearch:startIndex": 0,
        "opensearch:totalResults": 1,
        artistmatches: {
          artist: [test_artist]
        }
      }
    }

    service.artistSearch(test_artist.name).subscribe(response => {
      expect(response).toEqual(test_response);
    });
  });

  //Testing albumSearch()
  it('should return list of type album', () => {
    const test_album: Album = {
      name: "Test Track",
      artist: "Test Artist",
      url: "Test Url"
    }

    const test_response: AlbumSearchResponse = {
      results : {
        "opensearch:startIndex": 0,
        "opensearch:totalResults": 1,
        albummatches: {
          album: [test_album]
        }
      }
    }

    service.albumSearch(test_album.name).subscribe(response => {
      expect(response).toEqual(test_response);
    });
  });
});
