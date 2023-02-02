import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsStateInterface } from '../reducers/products.reducer';

export const productsFeatureSelector = createFeatureSelector<ProductsStateInterface>('productsReducer');

export const isLoadingProductsSelector = createSelector(
  productsFeatureSelector,
  (productsState: ProductsStateInterface) => productsState.isLoadingProducts
);

export const productsSelector = createSelector(
  productsFeatureSelector,
  (productsState: ProductsStateInterface) => productsState.products
);

export const productAddedSelector = createSelector(
  productsFeatureSelector,
  (productsState: ProductsStateInterface) => productsState.product
);


