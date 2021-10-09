import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../core/model/product.dto";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  providers: any[]
  providerSelected: any[];
  dataProviders = [
    {
      name: 'COLANTA'
    },
    {
      name: 'COLOMBINA'
    }
  ]
  form: FormGroup;
  disableButton: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.providers = this.dataProviders
    this.providerSelected = this.providers[0];
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      code: [null, Validators.required],
      stock: [null, Validators.required],
      idProvider: [null, [Validators.required]],
      netPrice: [null, [Validators.required]],
      sellPrice: [null, [Validators.required]],
      timestamp: [new Date(), [Validators.required]]
    });
  }

  buildForm(controls: any){
    let obj: any = {};
    for (const pro in controls) {
      if (controls[pro] && controls[pro].value != undefined) {
        obj[pro] = controls[pro].value;
      }
    }
    return<Product>{
      ...obj
    }
  }

  selectProvider(event: any) {
    this.providerSelected = event.query
  }

  filterProvider(event: any) {
    console.log(event)
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dataProviders.length; i++) {
      let provider = this.dataProviders[i];
      if (provider.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(provider);
      }
    }
    this.providers = filtered;
  }

  saveProduct() {
    this.disableButton = true;
    let product = this.buildForm(this.form.controls)
    console.log(product)
    this.disableButton = false
  }

}
