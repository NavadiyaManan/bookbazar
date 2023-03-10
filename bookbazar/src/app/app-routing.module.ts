import { VariableBinding } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import{NotFoundComponentComponent}from './auth/not-found-component/not-found-component.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { AuthGuard } from './guard/auth.guard';


const redirectUnauthorizedTologin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [ 
{path: '', component:LoginComponent},  
{path: 'login', component : LoginComponent  },
{path: 'register', component : RegisterComponent},
{path: 'dashboard', component : DashboardComponent},
// {path: 'dashboard', component : DashboardComponent, canActivate:[AngularFireAuthGuard],
//  data: { authGuardPipe: redirectUnauthorizedTologin}  },
{path: 'forgot-password', component : ForgotPassComponent},
{ path: '**', component: NotFoundComponentComponent }]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
