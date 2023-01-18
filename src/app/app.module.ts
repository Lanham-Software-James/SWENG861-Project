import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicArtistSearchComponent } from './components/music-artist-search/music-artist-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackSearchFormComponent } from './components/track-search-form/track-search-form.component';
import { TrackSearchResultsComponent } from './components/track-search-results/track-search-results.component';
import { ArtistSearchFormComponent } from './components/artist-search-form/artist-search-form.component';
import { ArtistSearchResultsComponent } from './components/artist-search-results/artist-search-results.component';
import { AlbumSearchFormComponent } from './components/album-search-form/album-search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicArtistSearchComponent,
    TrackSearchFormComponent,
    TrackSearchResultsComponent,
    ArtistSearchFormComponent,
    ArtistSearchResultsComponent,
    AlbumSearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,

    MatPaginatorModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
