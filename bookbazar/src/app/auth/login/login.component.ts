import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, NonNullableFormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  // isLoading=false;
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private builder: FormBuilder) { localStorage.removeItem('user'); }

  ngOnInit(): void {
    this.spinner.hide();
    this.loginform = this.builder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      },
    );

  }



  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  // login Function
  login() {

   
    
    if (this.loginform.valid) {
      // this.isLoading=true;
      this.spinner.show();

      this.submitted = true;
      this.auth.login(this.email, this.password);
     
      this.email = '';
      this.password = '';
    }
    // this.isLoading=false;
    // else {
    //   if (this.loginform.value.email == "admin@gmail.com" && this.loginform.value.password == "Admin@12345") {
    //     this.toastr.success("Welcome to Admin Credential")
    //     this.router.navigate(['user'])
    //   }
    //   this.toastr.error("Please Enter Valid data")
    // }
  }
  
}
