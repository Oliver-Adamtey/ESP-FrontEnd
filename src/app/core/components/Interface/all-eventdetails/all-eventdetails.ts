export interface AllEventdetails {
    content: ViewEventdetails
    data: AllEventdetails[]
    organizerFullName: string
    locationId: number
    eventId: number
    eventTitle: string
    eventCategory: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    eventImageUrl: string
    eventSummary: string
    eventPrice: number
    ticketType: string
    ticketStatus: string
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
    scheduleDate: string
    scheduleTime: string  
};

export interface allEventResponse{
    content:AllEventdetails[];
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

export interface ViewEventdetails {
    organizerFullName: string
    organizerEmail: string
    locationId: number
    eventId: number
    eventTitle: string
    eventCategory: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    eventImageUrl: string
    eventSummary: string
    eventPrice: number
    ticketType: string
    ticketStatus: string
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
    scheduleDate: string
    scheduleTime: string  
};

export interface ViewEventdetails {
    organizerFullName: string
    organizerEmail: string
    locationId: number
    eventId: number
    eventTitle: string
    eventCategory: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    eventImageUrl: string
    eventSummary: string
    eventPrice: number
    ticketType: string
    ticketStatus: string
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
};

export interface AttendeeProfile {
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}
