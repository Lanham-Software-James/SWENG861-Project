/**
 * Component class decleration for album-search-results-component
 */

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Album } from 'src/app/interfaces/album';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';
import { Artist } from 'src/app/interfaces/artist';
import { LastFmApiService } from 'src/app/services/last-fm-api.service';

@Component({
  selector: 'app-album-search-results',
  templateUrl: './album-search-results.component.html',
  styleUrls: ['./album-search-results.component.scss']
})
export class AlbumSearchResultsComponent {
  //Input value to be provided by parent component
  @Input() album_search_details!: AlbumSearchOutput;

  //variable to hold array of albums from api
  albums!: Album[];

  //variable to hold the total number of results from the api
  number_of_results!: number;

  //variable to hold the page size for the pagination
  pageSize: number = 10;

  //constuctor used for dependency injection of service used to interact with API
  constructor( private last_fm_api_service: LastFmApiService) { }

  //Angular lifecycle hook used to detect any input changes
  ngOnChanges(changes: SimpleChanges): void {
    //Refresh albums list when changes are detected
    this.getAlbums(1);
  }

  //Page change function used when pagination is interacted with
  pageChange($event: PageEvent): void {
    //Refreshing the page size incase of change
    this.pageSize = $event.pageSize;
    //Refreshing the array of albums for the new page
    this.getAlbums($event.pageIndex + 1);
  }

  //getAlbums function used to call the last FM api
  getAlbums(pageIndex: number): void {
    //Actually call the api
    this.last_fm_api_service.albumSearch(this.album_search_details.album_name, pageIndex, this.pageSize).subscribe(response => {
      //Store the album results in the albums array
      this.albums = response.results.albummatches.album;
      //Store the total number of responses
      this.number_of_results = response.results['opensearch:totalResults'];
    })
  }
}
