import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductInterface} from 'src/app/modules/widgets/types/product.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store, select} from '@ngrx/store';
import {AccessibleRoles, AccessibleStatuses} from 'src/app/shared/types/accessible-filters';
import { requestAddProductAction, requestGetProductsAction, requestAddProductClearAction, requestUpdateProductAction } from 'src/app/store/actions/products.actions';
import { productAddedSelector } from 'src/app/store/selectors/products.selector';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isEditing: boolean;
  isProductAdded$: Observable<ProductInterface | null>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  public rolesList: string[];
  public statusesList: string[];
  currentProduct:ProductInterface | null;

  constructor(
    private dialogRef: MatDialogRef<CreateEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.rolesList = [AccessibleRoles.Customer, AccessibleRoles.Business, AccessibleRoles.Admin];
    this.statusesList = [AccessibleStatuses.Open, AccessibleStatuses.Pending, AccessibleStatuses.Close];
    this.currentProduct = data.currentProduct;
    this.isEditing = false;
  }

  get name() {
    return this.form.get('name');
  }

  get address() {
    return this.form.get('address');
  }

  get amount() {
    return this.form.get('amount');
  }

  get role() {
    return this.form.get('role');
  }

  get status() {
    return this.form.get('status');
  }

  ngOnInit(): void {
    if(this.currentProduct) {
      this.isEditing = true;
      console.log(this.isEditing)
    }
    this.getInitialProductValuesForm();
    this.initializeValues();
  }

  initializeForm(productData: ProductInterface): void {
    this.form = this.fb.group({
      name: [productData.name, [Validators.required, Validators.minLength(3)]],
      address: [productData.address, [Validators.required, Validators.maxLength(25)]],
      amount: [productData.amount, [Validators.required]],
      role: [productData.role, Validators.required],
      status: [productData.status, Validators.required]
    });
  }

  getInitialProductValuesForm(): void {
    if (this.isEditing) {
        if (this.currentProduct) {
          const { name, address, amount, role, status } = this.currentProduct;
          console.log('from initial',this.currentProduct)
          const initialValuesForm = { name, address, amount, role, status };
          this.initializeForm(initialValuesForm);
        }
    } else {
      const initialValuesForm = {
        name: '',
        address: '',
        amount: null,
        role: '',
        status: ''
      };
      this.initializeForm(initialValuesForm);
    }
  }

  initializeValues(): void {
    this.isProductAdded$ = this.store.pipe(select(productAddedSelector));
  }

  onSubmit() {
    const request: ProductInterface = {
      name: this.name?.value,
      address: this.address?.value,
      amount: this.amount?.value,
      role: this.role?.value,
      status: this.status?.value,
    };
    if (this.isEditing && this.currentProduct && this.currentProduct.id) {
      const { id } = this.currentProduct;
      this.store.dispatch(requestUpdateProductAction({ updatedProduct: request, id: id}));
      this.addSuccessAlert('updated');
    } else {
      const request: ProductInterface = this.form.value;
      this.store.dispatch(requestAddProductAction({ product: request }));
      this.addSuccessAlert('added');
    }
  }

  addSuccessAlert(message: string): void {
    this.isProductAdded$.pipe(takeUntil(this.destroy$)).subscribe(product => {
      if (product) {
        this.store.dispatch(requestGetProductsAction());
        this.store.dispatch(requestAddProductClearAction());
        this.snackBar.open(`Product was ${message} successfully!`, '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.dialogRef.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

