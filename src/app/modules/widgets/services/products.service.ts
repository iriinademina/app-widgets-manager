import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from '../types/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private apiEndpoit: string;
  constructor(private http: HttpClient) {
    this.apiEndpoit = 'http://localhost:3000'
  }

  getProducts(): Observable<ProductInterface[]> {
    const url = this.apiEndpoit + '/products';
    return this.http.get<ProductInterface[]>(`${url}`);
  }

  addProduct(product: ProductInterface): Observable<ProductInterface> {
    const url = this.apiEndpoit + '/products';
    return this.http.post<ProductInterface>(url, product);
  }

  updateProduct(product: ProductInterface, id: number): Observable<ProductInterface> {
    const url = this.apiEndpoit + '/products';
    return this.http.patch<ProductInterface>(`${url}/${id}`, product);
  }
}
