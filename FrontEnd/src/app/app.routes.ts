import { Routes } from '@angular/router';
import { PocetnaStranaComponent } from './components/pocetna-strana/pocetna-strana.component';
import { IzmenaRazredaComponent } from './components/izmena-razreda/izmena-razreda.component';
import { PrikazRazredaComponent } from './components/prikaz-razreda/prikaz-razreda.component';
import { IzmenaOdeljenjaComponent } from './components/izmena-odeljenja/izmena-odeljenja.component';
import { PrikazOdeljenjaComponent } from './components/prikaz-odeljenja/prikaz-odeljenja.component';

export const routes: Routes = [ {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/pocetna-strana/pocetna-strana.component')
                        .then(m => m.PocetnaStranaComponent)
},
{
    path: 'razred-forma',
    loadComponent: () => import('./components/izmena-razreda/izmena-razreda.component')
                         .then(m => m.IzmenaRazredaComponent)
},
{
    path: 'razred-tabela',
    loadComponent: () => import('./components/prikaz-razreda/prikaz-razreda.component')
                         .then(m => m.PrikazRazredaComponent)
},
{
    path: 'odeljenje-forma',
    loadComponent: () => import('./components/izmena-odeljenja/izmena-odeljenja.component')
                         .then(m => m.IzmenaOdeljenjaComponent)
},
{
    path: 'odeljenje-tabela',
    loadComponent: () => import('./components/prikaz-odeljenja/prikaz-odeljenja.component')
                         .then(m => m.PrikazOdeljenjaComponent)
},
{
    path: "**",
    loadComponent: () => import('./components/error-404/error-404.component')
                         .then(m => m.Error404Component)
    
}
   
];
