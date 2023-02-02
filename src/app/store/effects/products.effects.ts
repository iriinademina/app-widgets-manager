import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import {
  requestGetProductsAction,
  requestGetProductsActionSuccessAction,
  requestGetProductsActionFailureAction,
  requestAddProductAction,
  requestAddProductSuccessAction,
  requestAddProductFailureAction,
  requestUpdateProductAction,
  requestUpdateProductSuccessAction,
  requestUpdateProductFailureAction
} from '../actions/products.actions';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/modules/widgets/services/products.service';
import { ProductInterface } from 'src/app/modules/widgets/types/product.interface';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffect {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestGetProductsAction),
      switchMap(() => {
        return this.productsService.getProducts().pipe(
          map((products: ProductInterface[]) => {
            return requestGetProductsActionSuccessAction({ products });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(requestGetProductsActionFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAddProductAction),
      switchMap(({ product }) => {
        return this.productsService.addProduct(product).pipe(
          map((product: ProductInterface) => {
            return requestAddProductSuccessAction({ product });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(requestAddProductFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUpdateProductAction),
      switchMap(({ updatedProduct, id }) => {
        return this.productsService.updateProduct(updatedProduct, id).pipe(
          map((updatedProduct: ProductInterface) => {
            return requestUpdateProductSuccessAction({ updatedProduct });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(requestUpdateProductFailureAction({ errors: errorResponse.error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, private router: Router) {}
}
