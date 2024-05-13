import { Component } from '@angular/core';
import { LayoutsComponent } from '../../components/layouts/layouts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
