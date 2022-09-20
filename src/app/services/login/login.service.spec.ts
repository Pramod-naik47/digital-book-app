import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/loginmodel';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTesting : HttpTestingController;

  const user :  User = {
    userId: 1,
    userName: 'Pramod',
    password: '1234',
    userType: 'Reader',
    email: "pramod@gmail.com",
    phoneNumber: 9482022134
}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpTesting = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should validate user', () => {
    service.ValidateUser(user).
    subscribe(
      res => {
        expect(res).toBeTruthy();
        console.log(res);
      }
    )
    const req = httpTesting.expectOne('https://localhost:7151/api/v1/digitalbooks/genarateToken')
    expect(req.request.method).toBe("POST");
    req.flush(user);
  })
   
});
