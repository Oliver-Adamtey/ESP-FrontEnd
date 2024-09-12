export interface UserData {
  id: number;
  statusText: string; 

}
export interface CoAdminPermissions {
  userId: number
  userLogo: string
  fullName: string
  email: string
  role: string
  canInviteUsers: boolean
  canDeleteUsers: boolean
  canViewUsers: boolean
  canViewAttendees: boolean
  canCreateEvent: boolean
}
export interface CoAdminPermissionsResponse {
  success: boolean;
  message: string;
  content: CoAdminPermissions[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  numberOfElements: number;
}
