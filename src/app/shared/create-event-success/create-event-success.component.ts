import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-event-success',
  standalone: true,
  imports: [

    RouterLink,
    RouterModule

  ],
  templateUrl: './create-event-success.component.html',
  styleUrl: './create-event-success.component.css'
})
export class CreateEventSuccessComponent {

  constructor( private router: Router){

  }

  Events(){
    this.router.navigate(['/org-event']);
  }

}
