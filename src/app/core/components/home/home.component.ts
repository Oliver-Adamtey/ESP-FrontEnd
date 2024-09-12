import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { RegistrationComponent } from "../registration/registration.component";
import { RegistrationService } from '../../services/Registration/registration.service';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { homeConstants } from './home-text';
import { HomeAccordionComponent } from './accordion/home-accordion.component';





@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ CommonModule, RouterOutlet, LoginComponent, RegistrationComponent,HomeAccordionComponent, RouterLink, FormsModule, ]
})
export class HomeComponent {

  constants = homeConstants
constructor(private router: Router, private activatedRoute: ActivatedRoute){}

ngOnInit() {
  this.activatedRoute.fragment.subscribe((fragment: string | null) => {
    if (fragment) this.jumpToSection(fragment);
  });
}

jumpToSection(section: string | null) {
  if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
}

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
