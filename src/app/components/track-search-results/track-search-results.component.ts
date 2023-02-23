/**
 * Component class for track search results component
 */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Track } from 'src/app/interfaces/track';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';
import { LastFmApiService } from 'src/app/services/last-fm-api.service';

@Component({
  selector: 'app-track-search-results',
  templateUrl: './track-search-results.component.html',
  styleUrls: ['./track-search-results.component.scss']
})
export class TrackSearchResultsComponent implements OnChanges {

  //Variable containing values passed from the parent component
  @Input() track_search_details!: TrackSearchOutput;

  //Storing the array of tracks from the api
  tracks!: Track[];

  //Storing the total number of results
  number_of_results!: number;

  //Storing the page size for the pagination
  pageSize: number = 10;

  //Constuctor for dependency injection for API service
  constructor( private last_fm_api_service: LastFmApiService) { }

  //Angular lifecycle hook to detect changes to the input variable
  ngOnChanges(changes: SimpleChanges): void {
    this.getTracks(1);
  }

  //Funciton called when the pagination is interacted with
  pageChange($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.getTracks($event.pageIndex + 1);
  }

  //Funciton to actually call the last FM API
  getTracks(pageIndex: number): void {
    this.last_fm_api_service.trackSearch(this.track_search_details.track_name, this.track_search_details.artist_name, pageIndex, this.pageSize).subscribe(response => {
      this.tracks = response.results.trackmatches.track;
      this.number_of_results = response.results['opensearch:totalResults'];
    })
  }
}
