import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

@Component({
  selector: 'app-artist-search-form',
  templateUrl: './artist-search-form.component.html',
  styleUrls: ['./artist-search-form.component.scss']
})
export class ArtistSearchFormComponent implements OnInit {

  @Output() formSubmit: EventEmitter<TrackSearchOutput> = new EventEmitter();

  artist_search_form = new FormGroup({
    artist_name: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    if(this.artist_search_form.valid){
      this.formSubmit.emit(this.artist_search_form.value);
    } else {
      this.formSubmit.error("Form is not filled properly");
    }
  }

}
