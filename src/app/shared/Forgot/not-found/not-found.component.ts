import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  closeBtn: boolean = true;
  forgotEmail = localStorage.getItem('forgotEmail')


  close(){
    this.closeBtn =false;

  }

}
