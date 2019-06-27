import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class StockListService {
  // Commonly Used Firebase References
  userRef = this.afs.collection('users');
  authRef = this.afa.authState;

  getUser(uid) {
    return new Promise((resolve) => {
      this.userRef.doc(uid).get().subscribe((userData)=> {
        resolve(userData.data())
      })
    })
  }

  createUserData(uid, email) {
    const userObject = {
      email: email,
      symbols: [],
      id: uid
    }
    this.userRef.doc(userObject.id).set(userObject)
  }

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {

  }
}
