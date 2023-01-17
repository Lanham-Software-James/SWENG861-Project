import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';
import { Track } from 'src/app/interfaces/track';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';
import { LastFmApiService } from 'src/app/services/last-fm-api.service';

@Component({
  selector: 'app-artist-search-results',
  templateUrl: './artist-search-results.component.html',
  styleUrls: ['./artist-search-results.component.scss']
})
export class ArtistSearchResultsComponent implements OnInit {
  @Input() artist_search_details!: ArtistSearchOutput;

  artists!: Artist[];
  number_of_results!: number;
  pageSize: number = 10;

  constructor( private last_fm_api_service: LastFmApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getArtists(1);
  }

  ngOnInit(): void {
  }

  pageChange($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.getArtists($event.pageIndex + 1);
  }

  getArtists(pageIndex: number): void {
    this.last_fm_api_service.artistSearch(this.artist_search_details.artist_name, pageIndex, this.pageSize).subscribe(response => {
      this.artists = response.results.artistmatches.artist;
      this.number_of_results = response.results['opensearch:totalResults'];
    })
  }
}
