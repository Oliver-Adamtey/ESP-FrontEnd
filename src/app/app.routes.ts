import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { LayoutsComponent } from './components/layouts/layouts.component';

export const routes: Routes = [
  
    // {
    //     path: 'store', component: StoreComponent
    // },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'store', component: StoreComponent
    },

    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }


    // {
    //     path: '', component: LayoutsComponent,
    //     children: [
    //         {
    //             path: '', redirectTo: 'home', pathMatch: 'full'
    //         },
    //         {
    //             path: 'home', component: HomeComponent
    //         },
    //         {
    //             path: 'store', component: StoreComponent
    //         }
    //     ]
    // }
];

