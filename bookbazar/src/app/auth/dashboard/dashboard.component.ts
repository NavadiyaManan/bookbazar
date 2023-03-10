import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { book } from 'src/app/book';
import { data } from 'src/app/data';
import { BookServiceService } from 'src/app/shared/book.service.service';
import { AuthService } from '../../shared/auth.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getData !: any;
  list: any;
  searchData: any;
  dataSource: any;
  bookdata : any[]=[];
  currentPage = 1;
  pageSize = 10;
  userDisplayName: any = '';
  profileUrl!:Observable<string | null>;
  // displayedColumns: string[] = ['fname', 'lname', 'mnum', 'email', 'age', 'Action'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private storage: AngularFireStorage,
    private service: AuthService,
    private toastr: ToastrService,
    private bs : BookServiceService,
    private spinner: NgxSpinnerService,
    private _auth: AuthService) {
     
     }

  ngOnInit(): void {
    // this.spinner.hide()
    // this.getUser()
    // this.userDisplayName = localStorage.getItem('firstName');
    this.getBook()
  }
  // Dialog config for add user
  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Add Book',
      buttonName: 'add book'
    }
    const dialogRef = this.dialog.open(AddUserComponent,dialogConfig);
    dialogRef.afterClosed().subscribe((ResData: any) => {
      
      this.spinner.show()
      if (ResData) {
       console.log("filePath",ResData)
        let res = this.bs.addBook(ResData);
        console.log("res",res)
    //    const task = this._storage.upload(filePath, file,);
    // task.then((res) => {
    //   console.log(res);
    // })
        this.toastr.success("User Added successfully")

      }
    }, (err: any) => {
      return this.toastr.error(err)
    });
  }

  //  Search bar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // get user's data
  // getUser() {
  //   this.service.getUser().subscribe((res: data[]) => {
  //     this.dataSource = new MatTableDataSource(res)
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sosrt = this.sort;
  //   })
  // }


  getBook() {
    this.bs.getBook().subscribe((res) => {

      this.bookdata=res.map((e:any)=>{
       
        const ref = this.storage.ref('book');
        this.profileUrl = ref.getDownloadURL();
        console.log(ref,this.profileUrl)
        const data =e.payload.doc.data();
        data.id=e.payload.doc.id;
        console.table(data)
        return data;
        
      })
      //  this.bookdata=res;

      //  console.table(this.bookdata)

      // this.dataSource = new MatTableDataSource(res)
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sosrt = this.sort;
    })
  }
  // Delete Data
  DeleteUser(data: any) {
    let decision = confirm("Are you want to Delete Data ?");
    if (decision == true) {
      this.spinner.show()
      // this.service.deleteUser(data);
    }
  }
  // logout
  logoutFirebase() {
    this._auth.logout();
    this.router.navigate(['login'])

  }

  updataUser(data: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.data.title = "Edit User";
    dialogConfig.data.buttonName = "Update";
    const dialogRef = this.dialog.open(AddUserComponent, { data });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.service.UpdateUser(data);
        this.toastr.success("User Update successfully.")
      }
    },(err:any)=>{
      return this.toastr.error(err)
    })
  } 
  getFilteredBooks(){

  }
}
