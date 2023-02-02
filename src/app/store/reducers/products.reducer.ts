import { createReducer, on, Action } from '@ngrx/store';
import {
  requestGetProductsAction,
  requestGetProductsActionSuccessAction,
  requestGetProductsActionFailureAction,
  requestAddProductAction,
  requestAddProductSuccessAction,
  requestAddProductFailureAction,
  requestAddProductClearAction,
  requestUpdateProductAction,
  requestUpdateProductSuccessAction,
  requestUpdateProductFailureAction
} from 'src/app/store/actions/products.actions';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ProductInterface } from 'src/app/modules/widgets/types/product.interface';

export interface ProductsStateInterface {
  products: ProductInterface[] | null;
  productsError: BackendErrorsInterface | null;
  isLoadingProducts: boolean;
  product: ProductInterface | null;
  createProductError: BackendErrorsInterface | null;
  isLoadingCreateProduct: boolean;

}

const initialState: ProductsStateInterface = {
  products: [],
  productsError: null,
  isLoadingProducts: false,
  product: null,
  createProductError: null,
  isLoadingCreateProduct: false
};

const ProductsReducer = createReducer(
  initialState,
  on(
    requestGetProductsAction,
    (state): ProductsStateInterface => ({
      ...state,
      isLoadingProducts: true,
      productsError: null,
    })
  ),
  on(
    requestGetProductsActionSuccessAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      products: action.products,
      isLoadingProducts: false,
    })
  ),
  on(
    requestGetProductsActionFailureAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      isLoadingProducts: false,
      productsError: action.errors,
    })
  ),
  on(
    requestAddProductAction,
    (state): ProductsStateInterface => ({
      ...state,
      isLoadingCreateProduct: true,
      createProductError: null,
    })
  ),
  on(
    requestAddProductSuccessAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      product: action.product,
      isLoadingCreateProduct: false,
    })
  ),
  on(
    requestAddProductFailureAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      createProductError: action.errors,
      isLoadingCreateProduct: false,
    })
  ),
  on(
    requestAddProductClearAction,
    (state, action): ProductsStateInterface => ({
      ...state,
      product: null,
    })
  ),
  //update

  on(
    requestUpdateProductAction,
    (state): ProductsStateInterface => ({
      ...state,
      isLoadingCreateProduct: true,
      createProductError: null,
    })
  ),
  on(requestUpdateProductSuccessAction, (state, { updatedProduct }):ProductsStateInterface => {
    return {
      ...state,
      product: updatedProduct,
      isLoadingCreateProduct: false,
      createProductError: null,
    };
  }),
  on(requestUpdateProductFailureAction, (state, { errors }) :  ProductsStateInterface => {
    return {
      ...state,
      product: null,
      isLoadingCreateProduct: false,
      createProductError: errors,
    };
  })

);

export function reducer(state: ProductsStateInterface | undefined, action: Action) {
  return ProductsReducer(state, action);
}
