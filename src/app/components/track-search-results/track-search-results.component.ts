import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Track } from 'src/app/interfaces/track';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';
import { LastFmApiService } from 'src/app/services/last-fm-api.service';

@Component({
  selector: 'app-track-search-results',
  templateUrl: './track-search-results.component.html',
  styleUrls: ['./track-search-results.component.scss']
})
export class TrackSearchResultsComponent implements OnInit, OnChanges {

  @Input() track_search_details!: TrackSearchOutput;

  tracks!: Track[];
  number_of_results!: number;
  pageSize: number = 10;

  constructor( private last_fm_api_service: LastFmApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTracks(1);
  }

  ngOnInit(): void {
  }

  pageChange($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.getTracks($event.pageIndex + 1);
  }

  getTracks(pageIndex: number): void {
    this.last_fm_api_service.trackSearch(this.track_search_details.track_name, this.track_search_details.artist_name, pageIndex, this.pageSize).subscribe(response => {
      this.tracks = response.results.trackmatches.track;
      this.number_of_results = response.results['opensearch:totalResults'];
    })
  }
}
