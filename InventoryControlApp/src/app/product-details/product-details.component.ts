import { Component, OnInit } from '@angular/core';
import { ProductDetails } from './product-detail-form/shared/product-details.model';
import { ProductDetailsService } from './product-detail-form/shared/product-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {

  constructor(public service: ProductDetailsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:ProductDetails){
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id: number){
    if (confirm('Are you sure to delete this record?'))
    {
    this.service.deleteProductDetail(id)
    .subscribe(
      res=>{
        this.service.refreshList();
        this.toastr.error("Deleted Successfully", "Payement details Deleted");
      },
      err => { console.log(err) }
    )
    }
  }

}
