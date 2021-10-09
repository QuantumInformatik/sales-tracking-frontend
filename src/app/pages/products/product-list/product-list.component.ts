import { Component, OnInit } from '@angular/core';
import {Product} from "../../../core/model/product.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];
  totalRecords = 0;
  loading = false;
  public sortField = 'id';
  public sortOrder = 1;

  public cols: any[] | undefined;

  constructor( private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {

    let product = {
      id: 1,
      name: "any",
      code: "any",
      stock: "any",
      idProvider: "any",
      netPrice: "any",
      sellPrice: "any",
      timestamp: "any",
    }

    this.products.push(product)

    this.cols = [
      { field: 'code', header: 'Code', width: '140px',sort: true, align: 'left' },
      { field: 'name', header: 'Name', width: '140px',sort: true, align: 'left' },
      { field: 'provider', header: 'Provider', width: '140px',sort: true, align: 'left' },
      { field: 'stock', header: 'Stock', width: '140px',sort: true, align: 'left' },
      { field: 'netPrice', header: 'Net price', width: '140px',sort: true, align: 'left' },
      { field: 'sellPrice', header: 'Sell price', width: '140px',sort: true, align: 'left' },
      { field: 'actions', header: 'Actions', width: '140px', align: 'left' },
    ];
  }

}
