import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchInput!: string;

  constructor(
    private _activateRouter: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activateRouter.queryParams
      .pipe(
        filter((params: Params) => params.search),
        map((params: Params) => params.search)
      )
      .subscribe((search) => {
        this.searchInput = search;
      });
  }

  onSearch() {
    this._router.navigate(['/items'], { queryParams: { search: this.searchInput } });
    this.searchInput = '';
  }
}
