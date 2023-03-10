import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Storage, ref ,uploadBytes} from '@angular/fire/storage' 

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(  private afs: AngularFirestore,
  ) {}



  addBook(book: any) {
    book.id = this.afs.createId()
   
    return this.afs.collection("Book/").add(book);
  }

  getBook() {
    // let noteRef = collection(this.afs, 'Book')
    // return collectionData(noteRef, { idField: 'id' }) as Observable<book[]>
    return this.afs.collection("Book/").snapshotChanges();
  }

  // getBook(book:any){
  //   book.id= this.afs.createId()
  //   return this.afs.collection("Book/").add(book);
  // }
}
