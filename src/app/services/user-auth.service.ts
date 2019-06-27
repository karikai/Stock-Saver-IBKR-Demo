import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { StockListService } from './stock-list.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  authRef = this.afa.authState;
  createUserRef = this.afa.auth.createUserWithEmailAndPassword;

  createUser(email: string, password: string) {
    this.createUserRef(email, password).then((newUser) => {
      this.stockList.createUserData(newUser.user.uid, email)
    })
  }
  
  getLoggedInUser() {
    return new Promise((resolve) => {
      this.authRef.subscribe((userInfo) => {
        if (userInfo) {
          resolve(userInfo)
        } else {
          resolve(null);
        }
      })
    })
  }

  getLoggedInUserId() {
    return new Promise((resolve) => {
      this.authRef.subscribe((userInfo) => {
        resolve(userInfo.uid)
      });
    });
  }

  constructor(private afa: AngularFireAuth, private stockList: StockListService) { }
}
