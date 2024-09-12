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
  id: string;
  fullName: string;
  profileImageUrl: string ;
  email: string;
  canEditEvent: boolean;
  canDeleteEvent: boolean;
  canInviteUser: boolean;
  canScheduleEvent: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Permissions {
  canDeleteEvent: boolean;
  canEditEvent: boolean;
  canInviteUser: boolean;
  canScheduleEvent: boolean;
}
