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
import { AlbumSearchOutput } from 'src/app/interfaces/album-search-output';

import { AlbumSearchFormComponent } from './album-search-form.component';

const FORM_VALUE : AlbumSearchOutput = {
  album_name: "Test Album",
} 

describe('AlbumSearchFormComponent', () => {
  let component: AlbumSearchFormComponent;
  let fixture: ComponentFixture<AlbumSearchFormComponent>;
  let compiled: HTMLElement;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumSearchFormComponent ],
      imports: [ MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatButtonModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSearchFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create the AlbumSearchForm component with correct markup', async() => {
    const formfields = await loader.getAllHarnesses(MatFormFieldHarness);
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    //Ensure component rendered
    expect(component).toBeTruthy();

    //Ensure correct number of form fields rendered
    expect(formfields.length).toEqual(1);

    //Ensure Album Name form field has correct properties
    expect(await formfields[0].getAppearance()).toEqual("fill");
    expect(await formfields[0].getLabel()).toEqual("Album Name");

    //Ensure correct number of input fields
    expect(inputs.length).toEqual(1);

    //Ensure Album Name input has correct properties
    expect(await inputs[0].getPlaceholder()).toEqual("Ex. Motion");
    expect(await inputs[0].getType()).toEqual("text");
    expect(await inputs[0].getValue()).toEqual("");

    //Ensure submit button have correct properties
    expect(await buttons.length).toBe(1);
    expect(await buttons[0].getText()).toEqual("Search");
  });

  it('should be invalid if album_name is dirty and null', () => {
    component.album_search_form.controls.album_name.markAsDirty();
    component.album_search_form.controls.album_name.setValue(null);

    expect(component.album_search_form.invalid).toBeTrue();
  });

  it('should have button disabled if form is invalid', async() => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    component.album_search_form.controls.album_name.markAsDirty();
    component.album_search_form.controls.album_name.setValue("");

    expect(await buttons[0].isDisabled()).toBeTrue();
  });

  it('should raise error if search is called without album name', () => {
    component.album_search_form.controls.album_name.markAsDirty();
    component.album_search_form.controls.album_name.setValue("");
    component.search();

    expect(component.formSubmit.hasError).toBeTrue();
  });

  it('should raise value if search() is called', () => {
    component.album_search_form.setValue(FORM_VALUE);
    component.search();

    component.formSubmit.pipe(first()).subscribe((value: AlbumSearchOutput) => {
      expect(value).toEqual(FORM_VALUE);
    });

    component.search();
  });
  
  it('should raise search value when search() is called', async() => {
    component.album_search_form.setValue(FORM_VALUE);

    component.formSubmit.pipe(first()).subscribe((value: AlbumSearchOutput) => {
      expect(value).toEqual(FORM_VALUE);
    });

    component.search();
  });
  
  it('should call search() on form submit', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const search = spyOn(component, "search");

    form.triggerEventHandler('ngSubmit', null);

    expect(search).toHaveBeenCalled();
  });
});
