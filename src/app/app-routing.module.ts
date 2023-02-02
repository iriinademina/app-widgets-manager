import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/components/main/main.component';

const productsModule = () => import('./modules/widgets/products.module').then(x => x.ProductsModule);

const routes: Routes = [
 {
  path: '',
  component: MainComponent,
  children: [
      { path: 'products', loadChildren: productsModule },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
  ],
},
{ path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
