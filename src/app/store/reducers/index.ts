import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from './products.reducer';

export interface RootState {
  productsReducer: fromProducts.ProductsStateInterface;
}

export const reducers: ActionReducerMap<RootState> = {
  productsReducer: fromProducts.reducer
};
