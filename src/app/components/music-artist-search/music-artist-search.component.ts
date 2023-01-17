import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/interfaces/track';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

@Component({
  selector: 'app-music-artist-search',
  templateUrl: './music-artist-search.component.html',
  styleUrls: ['./music-artist-search.component.scss']
})
export class MusicArtistSearchComponent implements OnInit {

  searched: boolean = false;

  tracks: Track[] = [];

  track_search_details!: TrackSearchOutput;

  constructor(  ) { }

  ngOnInit(): void {
    
  }

  searchTrack($event: TrackSearchOutput): void {
    this.searched = true;
    this.track_search_details = $event;
  }

}
