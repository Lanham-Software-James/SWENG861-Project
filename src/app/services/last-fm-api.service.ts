import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Track } from '../interfaces/track';

const API_KEY= "ab42aa8d968952e516fe82b051edbb48";

@Injectable({
  providedIn: 'root'
})
export class LastFmApiService {

  constructor(private http: HttpClient) { }

  public trackSearch(track_name: string, artist: string, page: number = 0, limit: number = 30): Observable<TrackSearchResponse> {
    return this.http.get<TrackSearchResponse>(`${ environment.last_fm_api_root }?method=track.search&api_key=${ environment.last_fm_api_key }&track=${ track_name }&artist=${ artist }&page=${ page }&limit=${ limit }&format=json`);
  }
}

interface TrackSearchResponse {
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
