export interface ForgotPassword {
  email: string;
}

export interface PasswordResetResponse {
  status: number;

}
export interface BbusinessInfo {

  approvalStatus: string ;
  description: string;
  organizationCertificate: string;
  organizationEmailAddress: string;
  organizationLogo: string;
  organizationName: string;
  organizationWebsite: string;

}

export interface BusinessError {
  businessErrorDescription: string;
}

export interface ErrorResponse {
  error: BusinessError;

}
