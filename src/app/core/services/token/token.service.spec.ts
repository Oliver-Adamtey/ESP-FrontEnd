import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';

describe('TokenService', () => {
  let service: TokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [TokenService]
    });
    service = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send token data via HTTP POST', () => {
    const testData = {username: 'testUser', password: 'testPassword'};
    const testResponse = {access_token: 'mockAccessToken', refresh_token: 'mockRefreshToken'};

    service.sendTokenData(testData).subscribe((response) => {
      expect(response).toEqual(testResponse);;
    })

    const req = httpMock.expectOne(service['tokenUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(testResponse);
  })

 
  it('should return true if access token axists(isLoginIn)', () => {
    sessionStorage.setItem('Token', service['encryptToken']('mockAccessToken'));

    expect(service.isLoggedIn()).toBe(true);
  })

  it('should return false if access token does not exist(isLoginIn)', () => {
    sessionStorage.removeItem('Token');
    expect(service.isLoggedIn()).toBe(false);
  })

  it('should clear sessionStorage and localStorage', () => {
    sessionStorage.setItem('Token','mockAccessToken');
    sessionStorage.setItem('refresh_token','mockAccessToken');
    localStorage.setItem('someItem', 'someValue');

    service.clear();

    expect(sessionStorage.getItem('Token')).toBeNull();
    expect(sessionStorage.getItem('refresh_token')).toBeNull();
    expect(localStorage.getItem('someItem')).toBeNull();
  })

  it('should get email from access token', () => {
    const mockTokenPayload = {userId: '1234', sub: 'test@example.com', fullName:'Test User', userRole: 'admin'};
    const mockToken = `header.${btoa(JSON.stringify(mockTokenPayload))}.signature`;

    sessionStorage.setItem('Token', mockToken)

    expect(service.getEmail()).toBe('test@example.com');
  })

  it('should get user role from access token', () => {
    const mockTokenPayload = { userId: '12345', sub: 'test@example.com', fullName: 'Test User', userRole: 'admin' };
    const mockToken = `header.${btoa(JSON.stringify(mockTokenPayload))}.signature`;

    sessionStorage.setItem('Token', mockToken);

    expect(service.getUserRole()).toBe('admin');
  });

  
});
