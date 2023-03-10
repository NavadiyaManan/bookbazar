import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RegisterComponent } from '../auth/register/register.component';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardComponent } from '../auth/dashboard/dashboard.component';
import { ForgotPassComponent } from '../auth/forgot-pass/forgot-pass.component';
describe('AuthGuard', () => {
  let guard: AuthGuard;
  
  beforeEach(() => {
   
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
