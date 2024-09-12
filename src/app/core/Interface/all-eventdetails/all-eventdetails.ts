export interface allEventdetails {
    organizerFullName: string;
    locationId: number;
    eventId: number;
    eventTitle: string;
    eventCategory: string;
    eventType: string
    moderatorMeeetingLink: string
    attendeeInviteLink: string
    eventStartDate: string;
    eventEndDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventImageUrl: string;
    organizerLogo: string;
    eventSummary: string;
    eventPrice: number;
    ticketType: string;
    ticketStatus: string;
    ticketQuantity: number;
    ticketTiers: string[];
    tags: string[];
    venueLocation: string;
    venueAddress1: string;
    venueAddress2: string;
    city: string;
    stateProvinceRegion: string;
    country: string;
    venueLayoutUrl: string;
    seatingTypeUrl: string;
    scheduleDate: string;
    scheduleTime: string;  
    lastModifiedInfo:string;
    createdInfo:string;
    
}
export interface allEventResponse{
    content:allEventdetails[];
    empty:boolean;
    first:boolean;
    last:boolean;
    number:number;
    numberOfElements:number;  
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
          sorted: boolean;
          empty: boolean;
          unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
      };
}

export interface registeredEvents {
    content: allEventdetails[];
    pageable: any;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: any;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
  
export interface FreeCheckoutData {
    name: string | null;
    email: string;
    phone: string;
}

export interface ViewEventdetails {
    organizerFullName: string
    organizerEmail: string
    locationId: number
    eventId: number
    eventTitle: string
    eventCategory: string
    eventType: string
    moderatorMeeetingLink: string
    attendeeInviteLink: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    eventImageUrl: string
    eventSummary: string
    eventPrice: number
    ticketType: string
    ticketStatus: string
    ticketTiers: TicketTier[]
    ticketQuantity: number
    tags: string[]
    venueLocation: string
    venueAddress1: string
    venueAddress2: string
    city: string
    stateProvinceRegion: string
    country: string
    venueLayoutUrl: string
    seatingTypeUrl: string
    organizerLogo: string
    scheduleDate: string
    scheduleTime: string
    profileImageUrl: string
    attendeeImages: AttendeeImage[]
    virtualEventPrice:number
    isAttendeeRegistered:boolean
}



export interface AttendeeImage {
    attendeeId: number
    profileImageUrl: string
}

export interface TicketTier {
    ticketTierId: number
    name: string
    price: number
    allocation: number
    reserveAllocation: number
    discounts: number[]
}
export interface Discount {
    discountId: number
    discountVariable: string
    discountType: string
    discountValue: number
    discountRule: string
    conditionValue: string
}

export interface upcomingEvents {
    organizerFullName: string
    organizerEmail: string
    locationId: number
    eventId: number
    eventTitle: string
    eventCategory: string
    eventType: string
    moderatorMeeetingLink: string
    attendeeInviteLink: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    eventImageUrl: string
    eventSummary: string
    tags: string[]
    venueLocation: string
    venueAddress1: string
    venueAddress2: string
    city: string
    stateProvinceRegion: string
    country: string
    venueLayoutUrl: string
    seatingTypeUrl: string
    organizerLogo: string
    ticketStatus: string
    ticketTiers: TicketTier[]
    scheduleDate: string
    scheduleTime: string
}

export interface AttendeeProfile {
    message: string;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}

export interface AreaOfInterest {
    name: string;
    selected: boolean;
    status: number;
}
  

export interface MeetingResponse {
    moderatorLink: string
    attendeeLink: string
}