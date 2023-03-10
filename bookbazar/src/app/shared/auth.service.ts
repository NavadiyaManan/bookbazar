import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { async } from '@firebase/util';
import { retry } from 'rxjs';
import { flush } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr'
import { data } from '../data';
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireValue = false;
  userData: any;
  firstName:any;
  createUserWithEmailAndPassword = false;


  constructor(
    private fireAuth: AngularFireAuth,
    private afs : AngularFirestore,
    private fs: Firestore, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
  }

  islogin(){
    const data=JSON.parse(localStorage.getItem('firstName')!)
    return data!== null ? true :false;

  }
  // Login Service call
  login(email: string, password: string) {
    // check for email Varification and store firstName
    this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      debugger;
      if (res.user?.emailVerified == true) {
        this.firstName=res.user?.displayName
        localStorage.setItem('firstName',this.firstName)
        debugger;
        this.router.navigate(['/dashboard']);
        
      } 
     
    }, err => {
      debugger;
      this.toastr.error(err.message);
      this.router.navigate(['/login']);
      this.spinner.hide();
    })
  }
  // Registration with email and password 
  register_auth(email: string, password: string,name:any) {
    {
      // send link for email varification
      this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
        this.firstName=res.user?.updateProfile({displayName:name})
        this.sendEmailForVarification(res.user);
         setTimeout(() => {
          this.toastr.success('Link has sent on your registered email. Please verify it.')
        }, 1000);

        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 10000);
     }, err => {
        this.toastr.info(' The email address is already in use by another account !')   
        this.router.navigate(['/register']);
      })
    }
  }

  // sign out
  logout() {
    this.fireAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
      })
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      // this.router.navigate(['/varify-email']);
      this.toastr.info("Password change successfully")
    }, err => {
     this.toastr.error(err)
    })
  }

  // email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/login']);
    }, (err: any) => {
      // alert('Something went wrong. Not able to send mail to your email.')
      this.toastr.error(err)
    })
  }

 
  // add User 
  addUser(data : any) {
    data.id = this.afs.createId() 
       return this.afs.collection("User/").add(data);
  }
 
  // get User 
  getUser():Observable<data[]>{
    let noteRef=collection(this.fs,'User')
    return collectionData(noteRef,{idField:'id'}) as Observable<data[]>
   }

  // delete user 
  deleteUser(d:data){
    const docRef = doc(this.fs, "User", d.id);
    return deleteDoc(docRef)
  }

  // update User 
  UpdateUser(data : any) {
    return this.afs.doc("User/"+data.id).update(data);
  }

}
