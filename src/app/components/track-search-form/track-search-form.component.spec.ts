import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';
import { first } from 'rxjs/operators';

import { TrackSearchFormComponent } from './track-search-form.component';

describe('TrackSearchFormComponent', () => {
  let component: TrackSearchFormComponent;
  let fixture: ComponentFixture<TrackSearchFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSearchFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the track-search-form component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form element', () => {
    expect(compiled.querySelector('form')).toBeDefined();
  });

  it('should render two mat-form-field elements', () => {
    expect(compiled.querySelectorAll('mat-form-field').length).toBe(2);
  });

  it('should render button element', () => {
    expect(compiled.querySelector('form button')).toBeDefined();
  });

  it('should render error text if track_name is dirty and form is invalid', () => {
    component.track_search_form.controls.track_name.markAsDirty();
    component.track_search_form.setErrors({'track_name': false});

    expect(compiled.querySelector('form div p')).toBeDefined();
  });

  it('should be invalid if track_name is dirty and null', () => {
    component.track_search_form.controls.track_name.markAsDirty();
    component.track_search_form.controls.track_name.setValue(null);

    expect(component.track_search_form.invalid).toBeTrue();
  });

  it('should have button disabled if form is invalid', () => {
    component.track_search_form.controls.track_name.markAsDirty();
    component.track_search_form.setErrors({'track_name': false});

    expect(compiled.querySelector('form button')?.getAttribute('disabled')).toBe("");
  });

  it('should call search() on form submit', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const search = spyOn(component, "search");

    form.triggerEventHandler('ngSubmit', null);

    expect(search).toHaveBeenCalled();
  });

  it('should raise search value when searched', async() => {
    const formValue : TrackSearchOutput = {
      track_name: "Test Track",
      artist_name: "Test Artist"
    } 

    component.track_search_form.setValue({
      track_name: formValue.track_name,
      artist_name: formValue.artist_name
    });

    component.formSubmit.pipe(first()).subscribe((value: TrackSearchOutput) => {
      expect(value).toEqual(formValue);
    });

    component.search();
  });
});
