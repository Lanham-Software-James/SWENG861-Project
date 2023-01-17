import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';

@Component({
  selector: 'app-track-search-form',
  templateUrl: './track-search-form.component.html',
  styleUrls: ['./track-search-form.component.scss']
})
export class TrackSearchFormComponent implements OnInit {

  @Output() formSubmit: EventEmitter<TrackSearchOutput> = new EventEmitter();

  track_search_form = new FormGroup({
    track_name: new FormControl('', Validators.required),
    artist_name: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    this.formSubmit.emit(this.track_search_form.value);
  }

}