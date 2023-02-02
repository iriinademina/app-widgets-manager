import { createAction, props } from '@ngrx/store';
import { ActionProductsTypes } from '../types/productsActionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ProductInterface } from 'src/app/modules/widgets/types/product.interface';

export const requestGetProductsAction = createAction(ActionProductsTypes.GET_PRODUCTS);

export const requestGetProductsActionSuccessAction = createAction(
  ActionProductsTypes.GET_PRODUCTS_SUCCESS,
  props<{ products: ProductInterface[] }>()
);

export const requestGetProductsActionFailureAction = createAction(
  ActionProductsTypes.GET_PRODUCTS_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);

export const requestAddProductAction = createAction(
  ActionProductsTypes.ADD_PRODUCT,
  props<{ product: ProductInterface }>()
);

export const requestAddProductSuccessAction = createAction(
  ActionProductsTypes.ADD_PRODUCT_SUCCESS,
  props<{ product: ProductInterface }>()
);

export const requestAddProductFailureAction = createAction(
  ActionProductsTypes.ADD_PRODUCT_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);

export const requestAddProductClearAction = createAction(ActionProductsTypes.ADD_PRODUCT_CLEAR);

export const requestUpdateProductAction = createAction(
  ActionProductsTypes.UPDATE_PRODUCT,
  props<{ updatedProduct: ProductInterface, id: number}>()
);

export const requestUpdateProductSuccessAction = createAction(
  ActionProductsTypes.UPDATE_PRODUCT_SUCCESS,
  props<{ updatedProduct: ProductInterface }>()
);

export const requestUpdateProductFailureAction = createAction(
  ActionProductsTypes.UPDATE_PRODUCT_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);



