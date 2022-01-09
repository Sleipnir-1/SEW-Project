import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.page.html',
  styleUrls: ['./password-forgot.page.scss'],
})
export class PasswordForgotPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  RecoverPassword(email){
    this.authService.PasswordRecover(email.value)
    .then((res) => {
      this.router.navigate(['login']); 
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
