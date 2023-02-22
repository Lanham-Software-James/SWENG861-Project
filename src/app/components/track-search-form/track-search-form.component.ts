/**
 * Component class for track-search-form component
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

@Component({
  selector: 'app-track-search-form',
  templateUrl: './track-search-form.component.html',
  styleUrls: ['./track-search-form.component.scss']
})
export class TrackSearchFormComponent {

  //Variable to pass the form data to the parent component
  @Output() formSubmit: EventEmitter<TrackSearchOutput> = new EventEmitter();

  //Reactive form decleration
  track_search_form = new FormGroup({
    track_name: new FormControl('', Validators.required),
    artist_name: new FormControl('')
  });

  //Function called by form submit
  search(): void {
    //Verify the form is valid
    if(this.track_search_form.valid){
      //If valid pass form data to parent component
      this.formSubmit.emit(this.track_search_form.value);
    } else {
      //Else pass error
      this.formSubmit.error("Form is not filled properly");
    }
  }
}