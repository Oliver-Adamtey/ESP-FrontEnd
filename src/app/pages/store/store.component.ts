import { Component } from '@angular/core';
import { LayoutsComponent } from '../../components/layouts/layouts.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [LayoutsComponent, CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
