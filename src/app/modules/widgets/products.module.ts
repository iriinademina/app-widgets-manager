import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateEditProductComponent } from './components/create-edit-product/create-edit-product.component';

const routes = [
    {
        path: '',
        component: ProductsComponent,
    }
];

@NgModule({
    declarations: [
    ProductComponent,
    ProductsComponent,
    CreateEditProductComponent
  ],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, FormsModule,ReactiveFormsModule],
    providers: [],
})
export class ProductsModule {}
