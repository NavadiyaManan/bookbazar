import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exam';

  constructor(
    private _auth: AuthService,private router :Router
  ) { }
  
  logoutFirebase() {
    // this._auth.SignOut();
    
    this.router.navigate(['login'])
  }
}
