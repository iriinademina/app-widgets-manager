import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInterface } from '../../types/product.interface';
import {MatDialogConfig} from "@angular/material/dialog";
import {CreateEditProductComponent} from "../create-edit-product/create-edit-product.component";
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() propsProduct: ProductInterface;
  @Output() productId: EventEmitter<number> = new EventEmitter<number>();

  constructor( private dialog: MatDialog) {}
  ngOnInit(): void {}

  openEditedProduct () {
    const currentProduct = this.propsProduct;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';
    dialogConfig.enterAnimationDuration = '200ms';
    dialogConfig.exitAnimationDuration = '200ms';
    dialogConfig.data = {
      currentProduct: currentProduct
    }
    const dialogRef = this.dialog.open(CreateEditProductComponent, dialogConfig);
  }
}
