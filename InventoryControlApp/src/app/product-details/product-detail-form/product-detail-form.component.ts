import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from 'src/app/product-details/product-detail-form/shared/product-details.service';
import { NgForm } from '@angular/forms';
import { ProductDetails } from './shared/product-details.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styles: [
  ]
})
export class ProductDetailFormComponent implements OnInit {

  constructor(public service: ProductDetailsService,
    private toastr:ToastrService) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(this.service.formData.productID == 0){
    this.insertRecord(form);
    }
    else{
    this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm){
    this.service.postProductDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted Successfully', 'Product Details Added');
      },
      err => {console.log(err); }
    );
  }

  updateRecord(form: NgForm){
    this.service.putProductDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated Successfully', 'Product Details Updated')
      },
      err => {console.log(err); }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new ProductDetails();
  }

}
