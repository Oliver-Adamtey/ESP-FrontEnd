export interface TicketTier {
  price: number;
}

export interface Record {
  eventId: number;
  eventImageUrl: string;
  organizerLogo: string;
  eventTitle: string;
  eventSummary: string;
  venueLocation: string;
  eventStartDate: Date;
  ticketStatus: string;
  ticketTiers: TicketTier[];
}


export interface Co_Organizer {
  id: string;
  username: string;
  email: string;
  role: string;
  profileImageUrl: string;
  status: string;
  action: string;
  fullName: string;
  enabled: boolean;

}

export interface NotificationSearch {
  id: number;
  title: string;
  message: string;
  timeAgo: string;
  dayAndTime: string;
  read: boolean;
}
