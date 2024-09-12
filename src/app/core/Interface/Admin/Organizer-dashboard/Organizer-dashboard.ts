export interface Organizer {
  message: string;
  statusCode: number;
  data: Data;
}

export interface Data {
  eventsHeldByOrganizer: number;
  sumOfAllocatedTickets: number;
  ticketsBought: number;
  paymentsOfRevenue: number;
  bestSellingEventID: number;
  organizerTicketsLefts: number;
  ticketsSalesPercentage: number;
  monthlyRevenueData: MonthlyRevenueData;
  bestSellingDataMonthly: BestSellingDataMonthly;
  bestSellingDataWeekly: BestSellingDataWeekly;
  bestSellingDataDaily: BestSellingDataDaily;
}

export interface BestSellingDataDaily {
  eventsHeldToday: number;
  ticketsSoldToday: number;
  ticketsLeft: number;
}

export interface BestSellingDataWeekly {
  ticketsSoldThisWeek: number;
  eventsHeldThisWeek: number;
  ticketsLeft: number;
}

export interface BestSellingDataMonthly {
  ticketsSoldThisMonth: number;
  ticketsLeft: number;
  eventsHeldInTheMonth: number;
}

export interface MonthlyRevenueData {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}