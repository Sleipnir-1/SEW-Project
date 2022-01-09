import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(){}

  //Registrierung, leitet Email und Passwort an Service weiter
  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      this.authService.SendVerificationMail()
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      window.alert(error.message)
    })
}

}