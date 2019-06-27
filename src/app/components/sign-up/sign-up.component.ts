import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;
  rePassword: string;
  validCredentials = true;

  signUp() {
    this.userAuth.createUser(this.email, this.password).then((uid) => {
      if (uid) {
        this.redirectToDashboard()
      } else {
        this.validCredentials = false;
      }
    })
  }

  secureSignUp() {
    if (this.validateEmail() && this.validatePassword()) {
      this.signUp();
    } else {
      this.validCredentials = false;
    }
  }

  validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.email).toLowerCase());
  }

  validatePassword() {
    let letterCheck = false;
    let numberCheck = false;
    const passwordLength = this.password.length;

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    for (let index = 0; index < this.password.length; index++) {
      const element = this.password[index];
      letters.forEach((letter) => {
        if (element === letter) {
          letterCheck = true;
        }
      })
      numbers.forEach((number) => {
        if (element === number.toString()) {
          numberCheck = true;
        }
      })
    }

    if (passwordLength > 5 && (letterCheck && numberCheck)) {
      return true;
    } else {
      return false;
    }
  }

  redirectToHome() {
    UtilitiesService.redirect('');
  }

  redirectToDashboard() {
    UtilitiesService.redirect('dashboard');
  }

  constructor(private userAuth: UserAuthService) { }

  ngOnInit() {
  }

}
