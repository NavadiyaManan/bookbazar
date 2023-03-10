import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    mnum: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  title = "Registration From"
  submitted = false;
  isLogin = false;
  email: string = '';
  password: string = '';
  IsSignIn = false

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private builder: FormBuilder, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerform = this.builder.group(
      {
        fname: ['', [Validators.required]],
        mnum: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        lname: ['', [Validators.required]],
        age: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerform.controls;
  }

  // Registration Function
  register() {
    this.submitted = true;
    if (this.registerform.valid) {
      console.log("else calling")
      this.auth.register_auth(this.registerform.value.email, this.registerform.value.password, this.registerform.value.fname);
      // this.register_store()
      this.toastr.success('Registered Successfully')
    }
  }


  // register_store(){
  //   const {value}=this.registerform.value
  //   console.log(this.registerform.value.fname);
  //   localStorage.setItem("firstName",this.registerform.value.fname)
  //   localStorage.setItem("lastName",this.registerform.value.lname)
  //   this.auth.addEmp(this.registerform.value).then((res:any)=>{
  //   if(res){
  //      console.log(res)
  //   } })  }
}
