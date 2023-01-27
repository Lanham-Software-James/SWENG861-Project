import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';

@Component({
  selector: 'app-album-search-form',
  templateUrl: './album-search-form.component.html',
  styleUrls: ['./album-search-form.component.scss']
})
export class AlbumSearchFormComponent implements OnInit {

  @Output() formSubmit: EventEmitter<AlbumSearchOutput> = new EventEmitter();

  album_search_form = new FormGroup({
    album_name: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    if(this.album_search_form.valid){
      this.formSubmit.emit(this.album_search_form.value);
    } else {
      this.formSubmit.error("Form is not filled properly");
    }
  }
}
