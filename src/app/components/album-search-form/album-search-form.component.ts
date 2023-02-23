/**
 * This is the component class for the album search form 
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';

@Component({
  selector: 'app-album-search-form',
  templateUrl: './album-search-form.component.html',
  styleUrls: ['./album-search-form.component.scss']
})
export class AlbumSearchFormComponent {

  //The output of the search used to pass the form values to the parent component
  @Output() formSubmit: EventEmitter<AlbumSearchOutput> = new EventEmitter();

  //Reactive form decleration
  album_search_form = new FormGroup({
    album_name: new FormControl('', Validators.required)
  });

  //This is the function that is called on the form submit
  search(): void {
    //Verify the form is valid
    if(this.album_search_form.valid){
      //If form is valid pass the form value to the parent component
      this.formSubmit.emit(this.album_search_form.value);
    } else {
      //If form is not valid pass and error to the parent component
      this.formSubmit.error("Form is not filled properly");
    }
  }
}
