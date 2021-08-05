import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EndpointService } from '../../services/endpoint.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public categories!: string[];
  public article!: {
    id: string;
    title: string;
    price: {
      currency: number;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
  };

  constructor(
    private _endpoint: EndpointService,
    private _activateRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.onGetProductDetail();
  }

  onGetProductDetail() {
    this._activateRouter.params
      .pipe(
        filter((params: Params) => params.id),
        map((params: Params) => params.id)
      )
      .subscribe((id: string) => {
        this._endpoint.getProduct(id).subscribe(
          (data) => {
            this.categories = data.categories;
            this.article = data.item;
          },
          (err) => {
            console.error(err);
          }
        );
      });
  }
}
