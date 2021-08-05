import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { EndpointService } from '../../services/endpoint.service';
import { ProductsArticlesI } from '../../interfaces/products-list.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public search!: string;
  public categories!: string[];
  public articles: ProductsArticlesI[] = [];

  constructor(
    private _endpoint: EndpointService,
    private _activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onGetProducts();
  }
  
  onGetProducts() {
    this._activateRouter.queryParams
      .pipe(
        filter((params: Params) => params.search),
        map((params: Params) => params.search)
      )
      .subscribe((search) => {
        this.search = search;
        this._endpoint.getProducts(search)
          .subscribe((data) => {
            this.categories = data.categories;
            this.articles = data.items;
          }, (err) => {
            console.error(err);
          }
        );
      });
  }
}
