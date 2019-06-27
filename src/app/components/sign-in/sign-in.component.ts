import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoaded: boolean;
  isSignedIn: boolean;
  email: string;
  password: string;
  wrongPassword: boolean;

  signIn() {
    this.userAuth.signIn(this.email, this.password);
  }

  signInVerification() {
    if (this.email && this.password) {
      this.userAuth.signIn(this.email, this.password).then(() => {
        this.userAuth.getLoggedInUser().then((user) => {
          if (user) {
            this.redirectToDashboard();
          } else {
            this.wrongPassword = true;
          }
        })
      });
    }
  }

  redirectToSignUp() {
    UtilitiesService.redirect('sign-up');
  }
  
  redirectToDashboard() {
    UtilitiesService.redirect('dashboard');
  }

  constructor(private userAuth: UserAuthService) {
    this.isLoaded = false;
    document.getElementsByTagName('html')[0].style.height = '0%';
    this.userAuth.getLoggedInUser().then((user) => {
      if (user) {
        this.redirectToDashboard();
      } else {
        this.isLoaded = true;
      }
    })
  }

  ngOnInit() {
  }

}
