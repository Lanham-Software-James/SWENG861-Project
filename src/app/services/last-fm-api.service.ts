/**
 * Last FM API service
 * This is the class that actually calls the Last FM API
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../interfaces/album';
import { Artist } from '../interfaces/artist';
import { Track } from '../interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class LastFmApiService {

  //Constructor used for dependency injection. Injecting the HttpClient
  constructor(private http: HttpClient) { }

  //Function responsible for searching tracks
  public trackSearch(track_name: string, artist: string, page: number = 0, limit: number = 30): Observable<TrackSearchResponse> {
    return this.http.get<TrackSearchResponse>(`${ environment.last_fm_api_root }?method=track.search&api_key=${ environment.last_fm_api_key }&track=${ track_name }&artist=${ artist }&page=${ page }&limit=${ limit }&format=json`);
  }

  //Function responsible for searching Artists
  public artistSearch(artist: string, page: number = 0, limit: number = 30): Observable<ArtistSearchResponse> {
    return this.http.get<ArtistSearchResponse>(`${ environment.last_fm_api_root }?method=artist.search&api_key=${ environment.last_fm_api_key }&artist=${ artist }&page=${ page }&limit=${ limit }&format=json`);
  }

  //Function responsible for searching albums
  public albumSearch(album: string, page: number = 0, limit: number = 30): Observable<AlbumSearchResponse> {
    return this.http.get<AlbumSearchResponse>(`${ environment.last_fm_api_root }?method=album.search&api_key=${ environment.last_fm_api_key }&album=${ album }&page=${ page }&limit=${ limit }&format=json`);
  }
}

//Track Search response interfaces
export interface TrackSearchResponse {
  results: TrackSearchDetails,
}

interface TrackSearchDetails {
  'opensearch:startIndex': number,
  'opensearch:totalResults': number,
  trackmatches: TrackMatches
}

interface TrackMatches {
  track: Track[]
}

//Artist Search response interfaces
export interface ArtistSearchResponse {
  results: ArtistSearchDetails,
}

interface ArtistSearchDetails {
  'opensearch:startIndex': number,
  'opensearch:totalResults': number,
  artistmatches: ArtistMatches
}

interface ArtistMatches {
  artist: Artist[]
}

//Album Search response interfaces
export interface AlbumSearchResponse {
  results: AlbumSearchDetails,
}

interface AlbumSearchDetails {
  'opensearch:startIndex': number,
  'opensearch:totalResults': number,
  albummatches: AlbumMatches
}

interface AlbumMatches {
  album: Album[]
}