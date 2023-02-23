/**
 * Component Class decleration for artist-search-results component
 */

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';
import { LastFmApiService } from 'src/app/services/last-fm-api.service';

@Component({
  selector: 'app-artist-search-results',
  templateUrl: './artist-search-results.component.html',
  styleUrls: ['./artist-search-results.component.scss']
})
export class ArtistSearchResultsComponent {
  //Input value containing the details of the search
  @Input() artist_search_details!: ArtistSearchOutput;

  //Array of artists retrieved from the API
  artists!: Artist[];

  //variable containing the total number of results from the api
  number_of_results!: number;

  //vairable containing the size of the page for the pagination
  pageSize: number = 10;

  //Constructor used for dependency injection for the API service
  constructor( private last_fm_api_service: LastFmApiService) { }

  //Angular lifecycle hook for detecting input changes
  ngOnChanges(changes: SimpleChanges): void {
    //Get new artist list when on change
    this.getArtists(1);
  }

  //Function called when user interacts with the pagination
  pageChange($event: PageEvent): void {
    //Set the pagesize
    this.pageSize = $event.pageSize;
    //Get the new list of artist from the api
    this.getArtists($event.pageIndex + 1);
  }

  //Function used to call the last FM api
  getArtists(pageIndex: number): void {
    //Actually calling the api
    this.last_fm_api_service.artistSearch(this.artist_search_details.artist_name, pageIndex, this.pageSize).subscribe(response => {
      //Storing the list of artists
      this.artists = response.results.artistmatches.artist;
      //Storing the total number of results
      this.number_of_results = response.results['opensearch:totalResults'];
    })
  }
}
