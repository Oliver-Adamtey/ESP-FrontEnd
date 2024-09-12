import { Pageable, Sort } from "./org.recent";

export interface SseResponse {
  data: Notification;
}

export interface SseData {
  event: string;
  message:  Notification | string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  timeAgo: string;
  dayAndTime: string;
}

export interface NotificationResponse {
  content: Notification[];
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

export interface NotificationData {
  id: number;
  selected?: boolean; 
  message: string;
  read: boolean;
  timeAgo: string;
  title: string;
  dayAndTime: string;
}

