import { Co_Organizer, NotificationSearch } from "../Organizer-filtering/records";

export interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface PageResponse {
  message: string;
  status: number;
  data?: {};
}

export interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
  message: string;
  userRole: string;
  fullName: string;
  userEmail: string;
  onboardingComplete: boolean;
  credentialsSubmitted: boolean;
  userId: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface PageResponse {
  message: string;
  statusCode: number;
  data?: {

  };
}



export interface PageDataResponse{

  message: string;
  statusCode: number;
  data:{
    content:Co_Organizer[];
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



}

export interface NotificationDataPageResponse{


    content:NotificationSearch[];
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
