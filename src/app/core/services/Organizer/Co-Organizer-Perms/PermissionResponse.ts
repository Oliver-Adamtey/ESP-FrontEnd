export interface PermissionDateResponse{
  status: number;
  content:PermissionInterface[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
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
  size: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;

}

export interface PermissionInterface {
  id: string;
  fullName: string;
  profileImageUrl: string ;
  email: string;
  canEditEvent: boolean;
  canDeleteEvent: boolean;
  canInviteUser: boolean;
  canScheduleEvent: boolean;
}
