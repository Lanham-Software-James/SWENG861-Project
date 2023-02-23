/**
 * Parent component class decleration
 */

import { Component, OnInit } from '@angular/core';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

@Component({
  selector: 'app-music-artist-search',
  templateUrl: './music-artist-search.component.html',
  styleUrls: ['./music-artist-search.component.scss']
})
export class MusicArtistSearchComponent {

  //Control variables to show results for each album, track or artist search
  track_searched: boolean = false;
  artist_searched: boolean = false;
  album_searched: boolean = false;

  //Form results
  track_search_details!: TrackSearchOutput;
  artist_search_details!: ArtistSearchOutput;
  album_search_details!: AlbumSearchOutput;

  //Function called when track is searched
  searchTrack($event: TrackSearchOutput): void {
    this.track_searched = true;
    this.track_search_details = $event;
  }

  //Function called when artist is searched
  searchArtist($event: ArtistSearchOutput): void {
    this.artist_searched = true;
    this.artist_search_details = $event;
  }

  //Function called when album is searched
  searchAlbum($event: AlbumSearchOutput): void {
    this.album_searched = true;
    this.album_search_details = $event;
  }
}
