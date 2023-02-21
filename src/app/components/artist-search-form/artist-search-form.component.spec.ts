/**
 * Test class for artist-search-form component
 */
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { first } from 'rxjs/operators';
import { ArtistSearchOutput } from 'src/app/interfaces/artist-search-output';

import { ArtistSearchFormComponent } from './artist-search-form.component';

//Test init
const FORM_VALUE : ArtistSearchOutput = {
  artist_name: "Test Artist"
} 

//Test init
describe('ArtistSearchFormComponent', () => {
  let component: ArtistSearchFormComponent;
  let fixture: ComponentFixture<ArtistSearchFormComponent>;
  let compiled: HTMLElement;
  let loader: HarnessLoader;
  
  //Test init
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchFormComponent ],
      imports: [ MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatButtonModule ]
    })
    .compileComponents();
  });

  //Test init
  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSearchFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  //Test form markup renders
  it('should create the ArtistSearchForm component with correct markup', async() => {
    const formfields = await loader.getAllHarnesses(MatFormFieldHarness);
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    //Ensure component rendered
    expect(component).toBeTruthy();

    //Ensure correct number of form fields rendered
    expect(formfields.length).toEqual(1);

    //Ensure Artist Name form field has correct properties
    expect(await formfields[0].getAppearance()).toEqual("fill");
    expect(await formfields[0].getLabel()).toEqual("Artist Name");

    //Ensure correct number of input fields
    expect(inputs.length).toEqual(1);

    //Ensure Artist Name input has correct properties
    expect(await inputs[0].getPlaceholder()).toEqual("Ex. Doja Cat");
    expect(await inputs[0].getType()).toEqual("text");
    expect(await inputs[0].getValue()).toEqual("");

    //Ensure submit button have correct properties
    expect(await buttons.length).toBe(1);
    expect(await buttons[0].getText()).toEqual("Search");
  });

  //Test form is invalid
  it('should be invalid if artist_name is dirty and null', () => {
    component.artist_search_form.controls.artist_name.markAsDirty();
    component.artist_search_form.controls.artist_name.setValue(null);

    expect(component.artist_search_form.invalid).toBeTrue();
  });

  //Test submit button is diabled if form is invalid
  it('should have button disabled if form is invalid', async() => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    component.artist_search_form.controls.artist_name.markAsDirty();
    component.artist_search_form.controls.artist_name.setValue("");

    expect(await buttons[0].isDisabled()).toBeTrue();
  });

  //Test error is raised if form is invalid when submitted
  it('should raise error if search is called without artist name', () => {
    component.artist_search_form.controls.artist_name.markAsDirty();
    component.artist_search_form.controls.artist_name.setValue("");
    component.search();

    expect(component.formSubmit.hasError).toBeTrue();
  });

  //Test form value is raised if form is valid when submitted
  it('should raise search value when search() is called', async() => {
    component.artist_search_form.setValue(FORM_VALUE);

    component.formSubmit.pipe(first()).subscribe((value: ArtistSearchOutput) => {
      expect(value).toEqual(FORM_VALUE);
    });

    component.search();
  });

  //Test search function is called on form submit
  it('should call search() on form submit', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const search = spyOn(component, "search");

    form.triggerEventHandler('ngSubmit', null);

    expect(search).toHaveBeenCalled();
  });
});
