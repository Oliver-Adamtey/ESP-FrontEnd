import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { BlogComponent } from './pages/blog/blog.component';

export const routes: Routes = [
    {
        path: '', component: LayoutsComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'store', component: StoreComponent },
            { path: 'blog', component: BlogComponent }
        ]
    },
    { path: '**', redirectTo: '' } // fallback route
];
