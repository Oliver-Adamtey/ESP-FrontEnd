import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { RegistrationComponent } from "../registration/registration.component";
import { RegistrationService } from '../../services/Registration/registration.service';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { navigationTexts, buttonTexts, mainHeading, subHeading, getStartedText, logoImagePath, homeImagePath } from './text';




@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ CommonModule, RouterOutlet, LoginComponent, RegistrationComponent, RouterLink, FormsModule, ]
})
export class HomeComponent {

  navigationTexts = navigationTexts;
  buttonTexts = buttonTexts;
  mainHeading = mainHeading;
  subHeading = subHeading;
  getStartedText = getStartedText;
  logoImagePath = logoImagePath;
  homeImagePath = homeImagePath

constructor(private router: Router){}

Login(){
  this.router.navigate(['/login']);
}

Signup(){
  this.router.navigate(['/signup']);
}

Home(){
  this.router.navigate(['/']);
 }


}
