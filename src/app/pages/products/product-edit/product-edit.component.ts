import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../core/model/product.dto";
import {Subscription} from "rxjs";
import {ProductService} from "../../../core/services/product.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  @Input() productEdit: Product | undefined;
  @Output() outputEmitProductSaved: EventEmitter<any> = new EventEmitter();
  private sub: Subscription = new Subscription();
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
  editar = false;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
              private productService: ProductService) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.providers = this.dataProviders
    this.providerSelected = this.providers[0];
    this.initializeForm();
    if(!ProductEditComponent.isEmptyObject(this.productEdit)){
      this.setProductForm();
    }
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      code: [null, Validators.required],
      stock: [null, Validators.required],
      providerId: [null, [Validators.required]],
      netPrice: [null, [Validators.required]],
      sellPrice: [null, [Validators.required]],
      timestamp: [new Date(), [Validators.required]]
    });
  }

  public setProductForm() {
    this.form.setValue({
      id: this.productEdit?.id,
      name: this.productEdit?.name,
      code: this.productEdit?.code,
      stock: this.productEdit?.stock,
      providerId: this.dataProviders[0],
      netPrice: this.productEdit?.netPrice,
      sellPrice: this.productEdit?.sellPrice,
      timestamp: this.productEdit?.timestamp,
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
      ...obj,
      timestamp: new Date(),
      providerId: 1
    }
  }

  selectProvider(event: any) {
    this.providerSelected = event.query
  }

  filterProvider(event: any) {
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
    if(!this.editar){
      this.sub.add(this.productService.saveProduct(product).subscribe(data => {

      }, error => {
        console.error('Error: ' + error);
      },() => {
        this.clearProduct()
        this.outputEmitProductSaved.emit();
        this.disableButton = false;
      }));
    }else{
      this.sub.add(this.productService.updateProduct(product).subscribe(data => {

      }, error => {
        console.error('Error: ' + error);
      },() => {
        /*this.clearProduct()*/
        this.outputEmitProductSaved.emit();
        this.disableButton = false;
      }));
    }
  }

  private static isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  clearProduct() {
    this.form.reset();
    this.providerSelected = this.providers[0];
  }
}
