import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { LayoutsComponent } from './components/layouts/layouts.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home',pathMatch: 'full'
    },
    {
        path: '', component: LayoutsComponent,
        children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'store', component: StoreComponent
            },
        ]
    }
];
