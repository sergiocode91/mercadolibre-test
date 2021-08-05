import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsListI } from '../interfaces/products-list.interface';
import { ProductDescriptionI } from '../interfaces/product-description.interface';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  private URL_API: string = 'http://localhost:3000';

  constructor(private _http: HttpClient) {}

  getProducts(search: string): Observable<ProductsListI> {
    return this._http.get<ProductsListI>(`${this.URL_API}/items?q=${search}`);
  }

  getProduct(id: string): Observable<ProductDescriptionI> {
    return this._http.get<ProductDescriptionI>(`${this.URL_API}/items/${id}`);
  }
}
