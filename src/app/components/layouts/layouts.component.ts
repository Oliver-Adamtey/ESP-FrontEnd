import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { StoreComponent } from '../../pages/store/store.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [RouterLink, HomeComponent, StoreComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {

}
