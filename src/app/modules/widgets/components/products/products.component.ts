import {Component, Inject} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable, of, switchMap} from 'rxjs';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProductInterface} from 'src/app/modules/widgets/types/product.interface';
import {CreateEditProductComponent} from '../create-edit-product/create-edit-product.component';
import {isLoadingProductsSelector, productsSelector} from 'src/app/store/selectors';
import {requestGetProductsAction} from 'src/app/store/actions/products.actions';
import {AccessibleRoles, AccessibleStatuses} from 'src/app/shared/types/accessible-filters';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  isLoading$: Observable<boolean>;
  products$: Observable<ProductInterface[] | null | undefined>;
  filteredProducts$: Observable<ProductInterface[] | null | undefined>;
  searchInput: string;
  roleType: string;
  statusType: string;
  rolesList: string[];
  statusesList: string[];

  constructor(private store: Store, private dialog: MatDialog) {
    this.rolesList = [AccessibleRoles.Customer, AccessibleRoles.Business, AccessibleRoles.Admin];
    this.statusesList = [AccessibleStatuses.Open, AccessibleStatuses.Pending, AccessibleStatuses.Close];
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.fetchProducts();
    this.isLoading$ = this.store.pipe(select(isLoadingProductsSelector));
    this.products$ = this.store.pipe(select(productsSelector));
    this.filteredProducts$ = this.products$;
  }

  fetchProducts(): void {
    this.store.dispatch(requestGetProductsAction());
  }

  onSearchProducts(searchText: string) {
    this.searchInput = searchText;
    if (!searchText && !this.roleType && !this.statusType) {
      this.filteredProducts$ = this.products$;
    } else {
      this.filteredProducts$ = this.products$.pipe(
        switchMap(products => {
          if (!searchText && this.statusType && !this.roleType) {
            const status = this.filterStatus(this.statusType, products);
            return of(status);
          } else if (!searchText && this.roleType && !this.statusType) {
            const roles = this.filterRole(this.roleType, products);
            return of(roles);
          } else if (!searchText && this.roleType && this.statusType) {
            const roles = this.filterRole(this.roleType, products);
            const statuses = this.filterStatus(this.statusType, roles);
            return of(statuses);
          } else if (searchText && this.statusType) {
            const res = this.filterText(searchText, products);
            const status = this.filterStatus(this.statusType, res);
            return of(status);
          } else if (searchText && this.roleType) {
            const res = this.filterText(searchText, products);
            const roles = this.filterRole(this.roleType, res);
            return of(roles);
          } else {
            return of(
              products?.filter((product: ProductInterface) => {
                return product.name.toLocaleLowerCase().includes(searchText);
              })
            )
          }
        }))
     }
  }

  changeTypeRole(role: string) {
    this.roleType = role;
    this.filteredProducts$ = this.products$.pipe(
      switchMap((products: any) => {
        if (this.statusType) {
          const statuses = this.filterStatus(this.statusType, products);
          const roles = this.filterRole(this.roleType, statuses);
          return of(roles);
        } else {
          const roles = this.filterRole(this.roleType, products);
          return of(roles);
        }
      })
    );
  }

  changeTypeStatus(status: string) {
    this.statusType = status;
    this.filteredProducts$ = this.products$.pipe(
      switchMap(products => {
        if (this.roleType) {
          const roles = this.filterRole(this.roleType, products);
          const statuses = this.filterStatus(this.statusType, roles);
          return of(statuses);
        } else {
          const statuses = this.filterStatus(this.statusType, products);
          return of(statuses);
        }
      })
    );
  }

  filterRole(type: string, arr: ProductInterface[] | null | undefined): ProductInterface[] | null | undefined {
    return arr?.filter(p => p.role === type)
  }

  filterText(text: string, arr: ProductInterface[] | null | undefined): ProductInterface[] | null | undefined {
    return arr?.filter((product: ProductInterface) => {
      return product.name.toLocaleLowerCase().includes(text);
    })
  }

  filterStatus(type: string, arr: ProductInterface[] | null | undefined): ProductInterface[] | null | undefined {
    return arr?.filter(p => p.status === type)
  }

  onAddProduct(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '500px';
    dialogConfig.enterAnimationDuration = '200ms';
    dialogConfig.exitAnimationDuration = '200ms';
    dialogConfig.data = {
      currentProductId: null
    };
    const dialogRef = this.dialog.open(CreateEditProductComponent, dialogConfig);
  }
}
