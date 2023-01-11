import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicArtistSearchComponent } from './components/music-artist-search/music-artist-search.component';

const routes: Routes = [
  {
    path: 'home',
    component: MusicArtistSearchComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
