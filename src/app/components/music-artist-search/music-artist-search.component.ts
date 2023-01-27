import { Component, OnInit } from '@angular/core';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';
import { Track } from 'src/app/interfaces/track';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

@Component({
  selector: 'app-music-artist-search',
  templateUrl: './music-artist-search.component.html',
  styleUrls: ['./music-artist-search.component.scss']
})
export class MusicArtistSearchComponent implements OnInit {

  track_searched: boolean = false;
  artist_searched: boolean = false;
  album_searched: boolean = false;

  track_search_details!: TrackSearchOutput;
  artist_search_details!: ArtistSearchOutput;
  album_search_details!: AlbumSearchOutput;

  constructor(  ) { }

  ngOnInit(): void {
  }

  searchTrack($event: TrackSearchOutput): void {
    this.track_searched = true;
    this.track_search_details = $event;
  }

  searchArtist($event: ArtistSearchOutput): void {
    this.artist_searched = true;
    this.artist_search_details = $event;
  }

  searchAlbum($event: AlbumSearchOutput): void {
    this.album_searched = true;
    this.album_search_details = $event;
  }
}
