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

  addStock(stockSymbol: string, uid: string) {
    return new Promise((resolve) => {
      this.userRef.doc(uid).get().subscribe((userData)=> {
        const user = userData.data()
        user.symbols.push(stockSymbol);
        this.userRef.doc(uid).set(user);
        resolve(true);
      })
    })
  }

  removeStock(stockSymbol: string, uid: string) {
    this.userRef.doc(uid).get().subscribe((userData) => {
      const user = userData.data();
      for (let index = 0; index < user.symbols.length; index++) {
        const element = user.symbols[index];
        if (element === stockSymbol) {
          delete user.symbols[index];
        }
      }
      user.symbols.push(stockSymbol);
      this.userRef.doc(uid).set(user);
      console.log(user);
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
