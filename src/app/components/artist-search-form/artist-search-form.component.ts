/**
 * Component class decleration for artist-search-form component
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

@Component({
  selector: 'app-artist-search-form',
  templateUrl: './artist-search-form.component.html',
  styleUrls: ['./artist-search-form.component.scss']
})
export class ArtistSearchFormComponent {

  //Output used to pass form value to parent component
  @Output() formSubmit: EventEmitter<TrackSearchOutput> = new EventEmitter();

  //Reactive form declaration
  artist_search_form = new FormGroup({
    artist_name: new FormControl('', Validators.required)
  });

  //Search function to be called on form submit
  search(): void {
    //Form validation check
    if(this.artist_search_form.valid){
      //If valid pass form value to parent component
      this.formSubmit.emit(this.artist_search_form.value);
    } else {
      //If invalid pass error to parent component
      this.formSubmit.error("Form is not filled properly");
    }
  }

}
