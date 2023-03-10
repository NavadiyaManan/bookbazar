import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { ToastrModule } from 'ngx-toastr';

import * as firebase from 'firebase/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NotFoundComponentComponent } from './auth/not-found-component/not-found-component.component';
import { MaterialModule } from 'src/material_module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { AddUserComponent } from './auth/add-user/add-user.component';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookServiceService } from './shared/book.service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPassComponent,
    
    AddUserComponent,
    NotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    BrowserAnimationsModule,
    MaterialModule,
    AngularFirestoreModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp( environment.firebase )),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
    MatGridListModule,
    provideAuth(() => getAuth()),
 
  ],
  providers: [BookServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
