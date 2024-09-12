export interface EventDataFields {
  eventTitle: string;
  eventCategory: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  tags: string;
  tag: string;
  eventImageUrl: string;
  organizerLogo: string;
  eventSummary: string;
  eventPrice: string;
  scheduleDate: string;
  scheduleTime: string;
  organizerEmail: string;
  organizerName: string;
  ticketType: string;
  ticketStatus: string;
  venueLocation: string;
  venueAddress1: string;
  venueAddress2: string;
  city: string;
  stateProvinceRegion: string;
  country: string;
  venueLayoutUrl: string;
  seatingTypeUrl: string;
  ticketQuantity: string;
}

// Define and export the fields array
export const eventFields: (keyof EventDataFields)[] = [
  'eventTitle',
  'eventCategory',
  'eventStartDate',
  'eventEndDate',
  'eventStartTime',
  'eventEndTime',
  'tags',
  'tag',
  'eventImageUrl',
  'organizerLogo',
  'eventSummary',
  'eventPrice',
  'scheduleDate',
  'scheduleTime',
  'organizerEmail',
  'organizerName',
  'ticketType',
  'ticketStatus',
  'venueLocation',
  'venueAddress1',
  'venueAddress2',
  'city',
  'stateProvinceRegion',
  'country',
  'venueLayoutUrl',
  'seatingTypeUrl',
  'ticketQuantity',
];

export interface BasicInformationObject {
  eventTitle: string;
  eventCategory: string;
  organizerEmail: string;
  organizerName: string;
  organizerLogo: string;
  tags: string[];
  tag: string;
}

export interface VenueAndLocationDataObject {
  venueLocation: string;
  venueAddress1: string;
  venueAddress2: string;
  city: string;
  stateProvinceRegion: string;
  country: string;
  venueLayoutUrl: string;
  seatingTypeUrl: string;
  eventType: string;
}

export interface DateAndTimeObject {
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
}

export interface EventAndTicketObject {
  eventImageUrl: string;
  eventSummary: string;
  ticketStatus: string;
  virtualEventPrice: string;
  ticketTiers: TicketTierWithDiscountsObject[];
}

export interface TicketTierWithDiscountsObject {
  name: string;
  price: number;
  allocation: number;
  reserveAllocation: number;
  discounts: DiscountObject[];
}

export interface DiscountObject {
  discountVariable: string;
  discountRule: string;
  conditionValue: string;
  discountType: string;
  discountValue: number;
}

export interface EventObject {
  city: string | null;
  country: string | null;
  eventCategory: string;
  eventEndDate: string;
  eventEndTime: string;
  isEventPublished: boolean;
  eventImageUrl: string;
  eventId: number;
  eventStartDate: string;
  eventStartTime: string;
  eventSummary: string;
  eventTitle: string;
  eventType: string;
  locationId?: number | null;
  moderatorMeeetingLink?: string;
  organizerEmail: string;
  organizerFullName: string;
  organizerLogo: string;
  organizerName: string;
  seatingTypeUrl: string | null;
  stateProvinceRegion: string | null;
  tags: string[];
  ticketStatus: string;
  ticketTiers: TicketTierWithDiscountsObject[];
  totalTicketAllocation?: number;
  venueAddress1: string | null;
  venueAddress2: string | null;
  venueLocation: string | null;
  venueLayoutUrl: string | null;
  virtualEventPrice?: number | null;
  scheduleDate?: string | null;
  scheduleTime?: string | null;
  attendeeImages?: string[] | null;
  attendeeInviteLink?: string;
  EventObject?: string;
  id?: string;
 createdInfo?: string;
 lastModifiedInfo?: string;
}

export interface EventMeetingUrl{
  attendeeLink: string;
  moderatorLink: string;
}

export interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
}

export interface ProfileResponse {
  message: string;
  status: number;
  data: ProfileData;
}


export interface AttendeeDetails {
  age: number;
  attendeeId: number;
  email: string;
  gender: string;
  name: string
  phoneNumber: string
  profileImageUrl: string
  registrationDate: string;
  ticketQuantity: number
  ticketStatusType: string
}
export interface viewAttendeeDetails {
  attendeeId: number;
  profileImageUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: Date;
  ticketQuantity: number;
  ticketStatusType: string;
  gender: string;
  age: number;
}




interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageableResponse {
  content: EventObject[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;

}
export interface CoOrganizerPermissionResponse {
  content: CoOrganizer[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
export interface PageableResponseAttendee {
  content: viewAttendeeDetails[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;

}

export interface CoOrganizerPermissionResponse {
  content: CoOrganizer[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface CoOrganizer {
  id: number;
  fullName: string;
  profileImageUrl: string | null;
  email: string;
  canEditEvent: boolean;
  canDeleteEvent: boolean;
  canInviteUser: boolean;
  canScheduleEvent: boolean;
}


