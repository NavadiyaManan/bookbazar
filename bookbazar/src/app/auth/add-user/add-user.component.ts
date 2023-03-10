import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/shared/auth.service';
import { BookServiceService } from 'src/app/shared/book.service.service';
import {Storage, ref ,uploadBytes} from '@angular/fire/storage'
import { AngularFireStorage } from '@angular/fire/compat/storage'
// import { uploadBytes } from 'firebase/storage';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {



  title = "User From"
  submitted = false;
  isLogin = false;
  price: string = '';
  password: string = '';
  IsSignIn = false
  addUserForm!: FormGroup;

  title1 !: string;
  author !: string;
  isbn !: string;
  condition !: string;
  id !: string;
  img!:String;
  buttonName !: string;
  file:any;filePath:any;;
  path!: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private builder: FormBuilder,
    // private book_service:BookServiceService,
    private toastr: ToastrService,
    // private s:Storage,
    private _storage:AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<AddUserComponent>) {

    this.id = data.id;
    this.title1 = data.title1;
    this.isbn = data.isbn;
    this.price = data.price;
    this.author = data.author;
    this.condition = data.condition;
    this.img = data.img;

    this.buttonName = data.buttonName;
    console.log(data);
  }

  ngOnInit(): void {

    this.addUserForm = this.builder.group({
      id: [this.id, []],
      title1: [this.title1, [Validators.required]],
      author: [this.author, [Validators.required]],
      isbn: [this.isbn, [Validators.required]],
      price: [this.price, [Validators.required]],
      condition: [this.condition, [Validators.required]],
      img: [this.img, [Validators.required]],
      file:[],
      filePath:[]

    })
  }


  cancelRegistration() {
    this.addUserForm.reset()
    this.dialogRef.close('');
  }


  Action() {
    this.dialogRef.close(this.addUserForm.value);
  }

  uploadImage(event: any) {
     this.file = event.target.files[0];
     this.filePath = this.file.name;
     this.addUserForm.value.file = this.file 
     this.addUserForm.value.filePath = this.filePath 

  }



}

