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
export class AlbumSearchResultsComponent implements OnInit {
  @Input() album_search_details!: AlbumSearchOutput;

  albums!: Album[];
  number_of_results!: number;
  pageSize: number = 10;

  constructor( private last_fm_api_service: LastFmApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAlbums(1);
  }

  ngOnInit(): void {
  }

  pageChange($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.getAlbums($event.pageIndex + 1);
  }

  getAlbums(pageIndex: number): void {
    this.last_fm_api_service.albumSearch(this.album_search_details.album_name, pageIndex, this.pageSize).subscribe(response => {
      this.albums = response.results.albummatches.album;
      this.number_of_results = response.results['opensearch:totalResults'];
    })
  }
}
