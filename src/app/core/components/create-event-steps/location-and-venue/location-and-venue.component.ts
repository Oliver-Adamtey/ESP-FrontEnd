import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '@notifications//notification.service';
import { VenueAndLocationDataObject } from '@interface/create-event/organizer';
import { ImageProcessingService } from '@services/image-processing/image-processing.service';
import { EventType } from '@angular/router';
import { countries } from './countries';

@Component({
  selector: 'app-location-and-venue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-and-venue.component.html',
  styleUrl: './location-and-venue.component.css'
})
export class LocationAndVenueComponent implements OnInit {
  @Output() nextStepEmit = new EventEmitter<number>();
  @Output() prevStepEmit = new EventEmitter<number>();
  locationAndVenueForm: FormGroup;

  venueAndLocationObject!: VenueAndLocationDataObject;

  locationImg: string = 'assets/esp/dashboard/location-img.png';
  urlPlaceholder: string = 'https://us04web.zoom.us/j/414?pwd=KFbm7Lc3.1';
  venueImageUrl: string | null = ''
  seatingTypeUrl: string | null = ''
  isVirtualSelected: boolean = false;
  isInPersonSelected: boolean = false;
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;


  constructor(private notificationService: NotificationService, private imageProcessingService: ImageProcessingService) {
    this.locationAndVenueForm = new FormGroup({
      venueLocation: new FormControl(''),
      venueAddress1: new FormControl(''),
      venueAddress2: new FormControl(''),
      city: new FormControl(''),
      stateProvinceRegion: new FormControl(''),
      country: new FormControl(''),
      venueLayoutUrl: new FormControl(''),
      seatingTypeUrl: new FormControl(''),
      eventType: new FormControl('',[Validators.required]),
    })
  }

  private clearFields() {
    this.locationAndVenueForm.get('venueLocation')?.patchValue('');
    this.locationAndVenueForm.get('venueAddress1')?.patchValue('');
    this.locationAndVenueForm.get('venueAddress2')?.patchValue('');
    this.locationAndVenueForm.get('city')?.patchValue('');
    this.locationAndVenueForm.get('stateProvinceRegion')?.patchValue('');
    this.locationAndVenueForm.get('country')?.patchValue('');
    this.locationAndVenueForm.get('venueLayoutUrl')?.patchValue('');
    this.locationAndVenueForm.get('seatingTypeUrl')?.patchValue('');
    this.locationAndVenueForm.updateValueAndValidity();
  }
  selectedCountry: string = 'Ghana';

countries = countries

  private setValidatorsNonRequired() {
    const controlsToUpdate = [
      'venueLocation',
      'venueAddress1',
      'city',
      'stateProvinceRegion',
      'country',
      'venueLayoutUrl',
      'seatingTypeUrl',
      'eventType'
    ];

    controlsToUpdate.forEach(controlName => {
      const control = this.locationAndVenueForm.get(controlName);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });

    this.locationAndVenueForm.updateValueAndValidity();
  }

  private setValidatorsRequired() {
    const controlsToUpdate = [
      'venueLocation',
      'venueAddress1',
      'city',
      'stateProvinceRegion',
      'country',
      'venueLayoutUrl',
      'seatingTypeUrl',
      'eventType'
    ];

    controlsToUpdate.forEach(controlName => {
      const control = this.locationAndVenueForm.get(controlName);
      if (control) {
        control.setValidators(Validators.required);
        control.updateValueAndValidity();
      }
    });

    this.locationAndVenueForm.updateValueAndValidity();
  }



  ngOnInit(): void {
    this.getVenueAndLocation();
  }

  getVenueAndLocation() {
    const venueAndLocationData = sessionStorage.getItem('LocationAndVenue');
    if (venueAndLocationData) {
      this.venueAndLocationObject = JSON.parse(venueAndLocationData);
      this.locationAndVenueForm.patchValue({
        venueLocation: this.venueAndLocationObject.venueLocation,
        venueAddress1: this.venueAndLocationObject.venueAddress1,
        venueAddress2: this.venueAndLocationObject.venueAddress2,
        city: this.venueAndLocationObject.city,
        stateProvinceRegion: this.venueAndLocationObject.stateProvinceRegion,
        country: this.venueAndLocationObject.country,
        venueLayoutUrl: this.venueAndLocationObject.venueLayoutUrl,
        seatingTypeUrl: this.venueAndLocationObject.seatingTypeUrl,
        eventType: this.venueAndLocationObject.eventType ,

      });

      if(this.locationAndVenueForm.get('eventType')?.value == 'IN_PERSON'){
        this.isInPersonSelected = true;
        this.isVirtualSelected = false
        console.log('hello1')


      }else{
      this.locationAndVenueForm.get('eventType')?.value == 'VIRTUAL'
      this.isVirtualSelected = true
      this.isInPersonSelected = false;
      console.log('hello')

      }
    }


  }

  toggleInPerson(isInPerson: boolean) {
    this.isVirtualSelected = false;
    this.isInPersonSelected = !this.isInPersonSelected;
    this.locationAndVenueForm.get('eventType')?.patchValue('IN_PERSON')
    this.setValidatorsRequired()
    console.log(this.locationAndVenueForm.value)

  }

  toggleVirtual(isVirtual: boolean) {
    this.isInPersonSelected = false;
    this.isVirtualSelected = !this.isInPersonSelected;
      this.locationAndVenueForm.get('eventType')?.patchValue('VIRTUAL')
      this.clearFields();
      this.setValidatorsNonRequired()

      this.checkInvalidFields()
    }

    checkInvalidFields() {
      for (const controlName in this.locationAndVenueForm.controls) {
        if (this.locationAndVenueForm.controls[controlName].invalid) {
          console.log(`${controlName} is invalid`);
        }
      }
    }



  onVenueImageChange(event: Event,) {
    this.imageProcessingService.handleImageUpload(event, 'venueLayoutUrl', this.locationAndVenueForm)
      .then(fileDataUrl => {
        this.venueImageUrl = fileDataUrl;
      })
      .catch(error => {
        this.notificationService.showError("Error uploading venue layout image")
      });
  }

  onSeatingImageChange(event: Event,) {
    this.imageProcessingService.handleImageUpload(event, 'seatingTypeUrl', this.locationAndVenueForm)
      .then(fileDataUrl => {
        this.seatingTypeUrl = fileDataUrl;
      })
      .catch(error => {
        this.notificationService.showError("Error uploading seating image")
      });
  }

  saveAndContinue = (): void => {
    if (this.locationAndVenueForm.valid) {
      sessionStorage.setItem(
        'LocationAndVenue',
        JSON.stringify(this.locationAndVenueForm.value)

      );
    }

    this.nextStepEmit.emit(3);
  };

  prevStep() {
    this.prevStepEmit.emit(1);
  }

}
