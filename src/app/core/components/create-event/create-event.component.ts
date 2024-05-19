import { CreateEventService } from './../../services/create-event/create-event.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CreateEventSuccessComponent } from "../../../shared/create-event-success/create-event-success.component";
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { PreloadComponent } from "../../../shared/create-event-preload/preload.component";




@Component({
    selector: 'app-create-event',
    standalone: true,
    templateUrl: './create-event.component.html',
    styleUrl: './create-event.component.css',
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
        ReactiveFormsModule,
        CommonModule,
        ScrollingModule,
        CreateEventSuccessComponent,
        PreloadComponent
    ]
})
export class CreateEventComponent {


  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'

  Event: string = 'Event'
  Vista: string = 'Vista'

  BackToEvent: string = 'Back to Event'
  Basic: string = 'Basic information'
  LocVenueLayout: string = 'Location & Venue layout'
  DateTime: string = 'Date & time'
  EventTicket: string = 'Event image & ticket'


  EventProgressImg: string = 'assets/esp/dashboard/event-create-back.png'
  closeTag: string = 'assets/esp/dashboard/Icon.png'
  EventLink: string = 'assets/esp/dashboard/basic-img.png'
  LocationImg: string = 'assets/esp/dashboard/location-img.png';
  DateAndTime: string = 'assets/esp/dashboard/date-img.png'
  Ticket: string = 'assets/esp/dashboard/ticket-img.png'


  venueLayoutUrl: string | null = null;
  seatingTypeUrl: string | null = null;
  eventImageUrl: string | null = null;
  organizerLogo: string | null = null;

  tagInput: string[] = [];
  tags: string[] = [];

  fields: boolean = false;

  showStart: boolean = false;
  showEnd: boolean = false;


  dsiplayStartTime: string = '';
  dsiplayEndTime: string = '';

  eventCreated = false;

  scheduleForm: boolean = false;
  publishNow: boolean = false;

  paidFormVisible: boolean = false;

  CreateEvent: FormGroup

  isSubmitted: boolean = false;
  isError: boolean = false

  constructor(private createEvent: CreateEventService, private router: Router, private fb: FormBuilder) {

    this.CreateEvent = new FormGroup({

      eventTitle: new FormControl('', [Validators.required]),
      eventCategory: new FormControl(['']),
      eventStartDate: new FormControl('', [Validators.required]),
      eventEndDate: new FormControl('', [Validators.required]),
      eventStartTime: new FormControl('', [Validators.required]),
      eventEndTime: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      tag: new FormControl('', []),
      eventImageUrl: new FormControl('', [Validators.required]),
      organizerLogo: new FormControl('', [Validators.required]),
      eventSummary: new FormControl('', [Validators.required]),
      eventPrice: new FormControl(''),
      scheduleDate: new FormControl(''),
      scheduleTime: new FormControl(''),
      organizerEmail: new FormControl(''),
      organizerName: new FormControl(''),
      ticketType: new FormControl(''),
      ticketStatus: new FormControl(''),
      venueLocation: new FormControl('', [Validators.required]),
      venueAddress1: new FormControl('', [Validators.required]),
      venueAddress2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      stateProvinceRegion: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      venueLayoutUrl: new FormControl('', [Validators.required]),
      seatingTypeUrl: new FormControl('', [Validators.required]),
      ticketQuantity: new FormControl('')

    });


  }

  // onSubmit() {
  //   this.eventCreated = true;
  //   if (this.CreateEvent.valid) {
  //     this.isSubmitted = true;

  //     const postData = this.CreateEvent.value;

  //     postData.ticketStatus = postData.eventPrice ? 'Paid' : 'Free';

  //     this.createEvent.createEvent(postData).subscribe({
  //       next: (response: any) => {
  //         console.log('Form submitted successful', response);
  //         this.publishNow = true;
  //         this.saveFormDataToLocalstorage(postData);
  //         this.router.navigateByUrl('/create-event-success');
  //       },

  //       error: (error) => {
  //         console.error('Error creating post:', error);
  //         console.log(postData);
  //         alert('Failed to create event. Please try again later');

  //       }
  //     });
  //   } else {
  //     this.fields = true;

  //   }
  // }

  onSubmit() {

    if (this.CreateEvent.valid) {
      this.isSubmitted = true;

      const postData = this.CreateEvent.value;

      postData.ticketStatus = postData.eventPrice ? 'Paid' : 'Free';

      timer(100)
        .pipe(take(1))
        .subscribe(() => {
          this.eventCreated = true;
          this.createEvent.createEvent(postData).subscribe({
            next: (response: any) => {
              console.log('Form submitted successful', response);
              this.publishNow = true;
              this.saveFormDataToLocalstorage(postData);
              this.router.navigateByUrl('/create-event-success');
            },

            error: (error) => {
              console.error('Error creating post:', error);
              console.log(postData);
              this.eventCreated = false;
              this.isError = true
            }
          });
        });
    } else {
      this.fields = true;
      this.eventCreated = false;
    }
  }

  private saveFormDataToLocalstorage(formData: any): void {
    localStorage.setItem('createEvent', JSON.stringify(formData).toString());

  }




  addTag(tag: string) {
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagsArray.patchValue(this.tags);
    }
    this.tag.patchValue('');
    console.log('this.tags', this.tags)
    console.log('Tags Array', this.tagsArray.value);

  }

  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
  }

  confirmDiscard() {
    const confirmDiscard = window.confirm('Are you sure you want to leave?');
    if (confirmDiscard) {
      this.router.navigate(['/org-event']);
    }

  }

  orgDash() {
    this.router.navigate(['/org-dash']);
  }
  orgEvent() {
    this.router.navigate(['/org-event'])
  }


  step: number = 1;

  displayStep1: boolean = false;

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  togglePaidForm() {
    this.paidFormVisible = !this.paidFormVisible;
  }

  disable: boolean = true;

  logoImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const fileDataUrl = reader.result as string;

        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;

          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };
      reader.readAsDataURL(file);
    }
  }



  locationImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.venueLayoutUrl = fileDataUrl;

        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
    }
  }



  seatingImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.seatingTypeUrl = fileDataUrl;
        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
    }
  }

  eventImage(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const fileDataUrl = reader.result as string;
        this.eventImageUrl = fileDataUrl;
        const readerForBase64 = new FileReader();
        readerForBase64.onload = () => {
          const base64Data = readerForBase64.result as string;
          this.CreateEvent.get(controlName)?.setValue(base64Data);
        };
        readerForBase64.readAsDataURL(file);
      };

      reader.readAsDataURL(file);
    }
  }



  toggleStartTime(event: any) {
    if (event.target.checked) {
      this.showStart = true;
      this.dsiplayStartTime = '';
    } else {
      this.showStart = false;
      this.dsiplayStartTime = '';
    }
  }

  toggleEndTime(event: any) {
    if (event.target.checked) {
      this.showEnd = true;
      this.dsiplayEndTime = '';
    } else {
      this.showEnd = false;
      this.dsiplayEndTime = '';
    }
  }




  toggleSchedule(event: any) {
    this.scheduleForm = true;
    this.scheduleForm = event.target.value === 'later';
    this.publishNow = !this.scheduleForm;
  }


  togglePublishNow(event: any) {
    this.publishNow = event.target.value === 'now';
    this.scheduleForm = !this.publishNow;
  }

  ngOnInit(): void {

    this.togglePublishNow
    this.toggleSchedule
  }

  get tagsArray() {
    return this.CreateEvent.get('tags')!;
  }

  get tag() {
    return this.CreateEvent.get('tag')!;
  }



}
