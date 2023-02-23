/**
 * Test class for track-search-form component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrackSearchOutput } from 'src/app/interfaces/track-search-output';
import { first } from 'rxjs/operators';

import { TrackSearchFormComponent } from './track-search-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness} from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

//Test init
const FORM_VALUE : TrackSearchOutput = {
  track_name: "Test Track",
  artist_name: "Test Artist"
} 

//Test init
describe('TrackSearchFormComponent', () => {
  let component: TrackSearchFormComponent;
  let fixture: ComponentFixture<TrackSearchFormComponent>;
  let compiled: HTMLElement;
  let loader: HarnessLoader;

  //Test init
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSearchFormComponent ],
      imports: [ MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatButtonModule ]
    })
    .compileComponents();
  });

  //Test init
  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSearchFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  //test markup is rendered
  it('should create the track-search-form component with correct markup', async() => {
    const formfields = await loader.getAllHarnesses(MatFormFieldHarness);
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    //Ensure component rendered
    expect(component).toBeTruthy();

    //Ensure correct number of form fields rendered
    expect(formfields.length).toEqual(2);

    //Ensure Track Name form field has correct properties
    expect(await formfields[0].getAppearance()).toEqual("fill");
    expect(await formfields[0].getLabel()).toEqual("Track Name");

    //Ensure Artist Name form field has correct properties
    expect(await formfields[1].getAppearance()).toEqual("fill");
    expect(await formfields[1].getLabel()).toEqual("Artist Name");

    //Ensure correct number of input fields
    expect(inputs.length).toEqual(2);

    //Ensure Track Name input has correct properties
    expect(await inputs[0].getPlaceholder()).toEqual("Ex. Beast of Burden");
    expect(await inputs[0].getType()).toEqual("text");
    expect(await inputs[0].getValue()).toEqual("");

    //Ensure Artist Name input has correct properties
    expect(await inputs[1].getPlaceholder()).toEqual("Ex. The Rolling Stones");
    expect(await inputs[1].getType()).toEqual("text");
    expect(await inputs[1].getValue()).toEqual("");

    //Ensure submit button have correct properties
    expect(await buttons.length).toBe(1);
    expect(await buttons[0].getText()).toEqual("Search");
  });
  
  //Test form validation
  it('should be invalid if track_name is dirty and null', () => {
    component.track_search_form.controls.track_name.markAsDirty();
    component.track_search_form.controls.track_name.setValue(null);

    expect(component.track_search_form.invalid).toBeTrue();
  });

  //Test form validation
  it('should have button disabled if form is invalid', async() => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    component.track_search_form.controls.track_name.markAsDirty();
    component.track_search_form.controls.track_name.setValue("");

    expect(await buttons[0].isDisabled()).toBeTrue();
  });

  //Test form passing error
  it('should raise error if search is called without track name', () => {
    component.track_search_form.controls.track_name.markAsDirty();
    component.track_search_form.controls.track_name.setValue("");
    component.search();

    expect(component.formSubmit.hasError).toBeTrue();
  });

  //Test search function  
  it('should raise search value when search() is called', async() => {
    component.track_search_form.setValue(FORM_VALUE);

    component.formSubmit.pipe(first()).subscribe((value: TrackSearchOutput) => {
      expect(value).toEqual(FORM_VALUE);
    });

    component.search();
  });
  
  //Test form submit function
  it('should call search() on form submit', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const search = spyOn(component, "search");

    form.triggerEventHandler('ngSubmit', null);

    expect(search).toHaveBeenCalled();
  });
});
