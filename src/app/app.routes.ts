import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './component/libro/libro.component';
import { EscuelaComponent } from './component/escuela/escuela.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Página principal',
      },
      {
        path: 'escuela',
        component: EscuelaComponent,
        title: 'Soy Escuela',
      },
            {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
];
