import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NotificationService } from '@notifications//notification.service';
import {
  DiscountObject,
  EventAndTicketObject
} from '@interface/create-event/organizer';
import { ImageProcessingService } from '@services/image-processing/image-processing.service';

@Component({
  selector: 'app-event-image-and-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-image-and-ticket.component.html',
  styleUrl: './event-image-and-ticket.component.css',
})
export class EventImageAndTicketComponent implements OnInit {
  @Output() nextStepEmit = new EventEmitter<number>();
  @Output() prevStepEmit = new EventEmitter<number>();
  eventAndTicketForm: FormGroup;
  eventImageUrl: string | null = null;
  isPaidSelected: boolean = false;
  isFreeSelected: boolean = false;
  isVirtualSelected:boolean = false;

  eventAndTicketObject!: EventAndTicketObject;
  ticket: string = 'assets/esp/dashboard/ticket-img.png';

  constructor(private notificationService: NotificationService, private imageProcessingService: ImageProcessingService) {
    this.eventAndTicketForm = new FormGroup({
      eventImageUrl: new FormControl('', [Validators.required]),
      eventSummary: new FormControl('', [Validators.required]),
      ticketStatus: new FormControl(''),
      ticketTiers: new FormArray([]),
      virtualEventPrice: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getEventAndTicket();
  }

  getEventAndTicket() {
    const eventAndTicketData = sessionStorage.getItem('EventAndTicket');
    if (eventAndTicketData) {
      this.eventAndTicketObject = JSON.parse(eventAndTicketData);
      this.eventAndTicketForm.patchValue({
        eventImageUrl: this.eventAndTicketObject.eventImageUrl,
        eventSummary: this.eventAndTicketObject.eventSummary,
        ticketStatus: this.eventAndTicketObject.ticketStatus,
        virtualEventPrice: this.eventAndTicketObject.virtualEventPrice
      });

      this.isFreeSelected = this.eventAndTicketObject.ticketStatus === 'Free';
      this.isPaidSelected = this.eventAndTicketObject.ticketStatus === 'Paid';

      this.checkEventType()
      if(this.isPaidSelected && this.isVirtualSelected){


      }
      const ticketTiers = this.eventAndTicketObject.ticketTiers || [];
      ticketTiers.forEach((tier) => {
        const newTier = this.createTicketTier();
        newTier.patchValue(tier);
        this.ticketTiers.push(newTier);

        const discounts = tier.discounts || [];
        discounts.forEach((discount) => {
          this.addDiscountRule(this.ticketTiers.length - 1, discount);
        });
      });


      this.isFormVisible = this.getDiscounts != null;
    }
  }

  onEventImageChange(event: Event) {
    this.imageProcessingService.handleImageUpload(event, 'eventImageUrl', this.eventAndTicketForm)
      .then(fileDataUrl => {
        this.eventImageUrl = fileDataUrl;
      })
      .catch(error => {
        this.notificationService.showError("Error uploading event image")
      });
  }

  saveAndContinue = (): void => {


    if (this.eventAndTicketForm.valid) {
      sessionStorage.setItem(
        'EventAndTicket',
        JSON.stringify(this.eventAndTicketForm.value)
      );
    }

    this.nextStepEmit.emit(5);
  };

  prevStep() {
    this.prevStepEmit.emit(3);
  }

  toggleFreeForm(isFreeSelected: boolean) {
    this.checkEventType();
    this.eventAndTicketForm.get('ticketStatus')?.setValue('Free');
    this.isPaidSelected = false;
    this.isFreeSelected = !this.isFreeSelected;
    if(this.isFreeSelected && this.isVirtualSelected) {
      this.eventAndTicketForm.get('virtualEventPrice')?.clearValidators();
      this.eventAndTicketForm.get('virtualEventPrice')?.updateValueAndValidity()
      this.eventAndTicketForm.get('virtualEventPrice')?.reset();
    }else{
      this.ticketTiers.clear();
      console.log(this.ticketTiers)

    }

  }

  togglePaidForm(isPaidSelected: boolean) {
    this.checkEventType()
    this.eventAndTicketForm.get('ticketStatus')?.setValue('Paid');
    this.isFreeSelected = false;
    this.isPaidSelected = !this.isPaidSelected;

    if(this.isPaidSelected && this.isVirtualSelected) {
      this.eventAndTicketForm.get('virtualEventPrice')?.setValidators(Validators.required)
      this.eventAndTicketForm.get('virtualEventPrice')?.updateValueAndValidity()
      this.eventAndTicketForm.get('virtualEventPrice')?.reset();
    }else{
      this.ticketTiers.clear();
      this.ticketTiers.push(this.createTicketTier());
    }

  }




  checkEventType(){
    const storedData = sessionStorage.getItem('LocationAndVenue');
    if(storedData){
      const locationAndVenue = JSON.parse(storedData);
      const eventType = locationAndVenue.eventType;
      if (eventType === 'VIRTUAL') {
      this.isVirtualSelected = true;
    }
  }
  }

  isFormVisible: boolean = false;
  toggleAccordion() {
    this.isFormVisible = !this.isFormVisible;
  }

  get ticketTiers(): FormArray {
    return this.eventAndTicketForm.get('ticketTiers') as FormArray;
  }

  createTicketTier(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      allocation: new FormControl('', [Validators.required]),
      reserveAllocation: new FormControl(''),
      discounts: new FormArray([]),
    });
  }

  getDiscounts(tierIndex: number): FormArray {
    return this.ticketTiers.at(tierIndex).get('discounts') as FormArray;
  }

  addTicketTier() {
    if (this.ticketTiers.valid) {
      this.ticketTiers.push(this.createTicketTier());
    }
  }

  addDiscountRule(tierIndex: number, discount?: DiscountObject) {
    if (this.ticketTiers.at(tierIndex).get('discounts')?.value.length < 3) {
      const discountFormGroup = new FormGroup({
        discountVariable: new FormControl(discount?.discountVariable || '', [Validators.required]),
        discountRule: new FormControl(discount?.discountRule || '', [Validators.required]),
        conditionValue: new FormControl(discount?.conditionValue || '', [Validators.required]),
        discountType: new FormControl(discount?.discountType || '', [Validators.required]),
        discountValue: new FormControl(discount?.discountValue || '', [Validators.required]),
      });
      (this.ticketTiers.at(tierIndex).get('discounts') as FormArray).push(
        discountFormGroup
      );
    } else {
      this.notificationService.showError(
        'Cannot create more than 3 discount rule'
      );
    }
  }

  removeRule(tierIndex: number, discountRuleIndex: number) {
    const discountsArray = this.ticketTiers
      .at(tierIndex)
      .get('discounts') as FormArray;
    discountsArray.removeAt(discountRuleIndex);
  }

  removeTicketTier(tierIndex: number) {
    this.ticketTiers.removeAt(tierIndex);
  }

  subscribeToDiscountVariableChanges(discountFormGroup: FormGroup) {
    discountFormGroup.get('discountVariable')?.valueChanges.subscribe(value => {
      const conditionValueControl = discountFormGroup.get('conditionValue');
      if (value === 'Gender') {
        conditionValueControl?.setValidators([Validators.required]);
        conditionValueControl?.updateValueAndValidity();
      } else {
        conditionValueControl?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        conditionValueControl?.updateValueAndValidity();
      }
    });
  }
}
