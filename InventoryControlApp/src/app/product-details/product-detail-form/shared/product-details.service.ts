import { Injectable } from '@angular/core';
import { ProductDetails } from './product-details.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) {}

  formData:ProductDetails = new ProductDetails();
  readonly baseURL = "https://localhost:44338/api/ProductDetail";
  
  list : ProductDetails[];

  postProductDetail(){
    return this.http.post(this.baseURL, this.formData);
  }

  putProductDetail(){
    return this.http.put(`${this.baseURL}/${this.formData.productID}`, this.formData);
  }

  deleteProductDetail(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as ProductDetails[]);
  }
}
