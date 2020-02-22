import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  favWhislistCount = new Subject<any>();
  cartTotalItem = new Subject<any>();
  dataSource: string = "assets/data.json"
  constructor(private http: HttpClient) { }
  
  getItemList() {
    let products = JSON.parse(localStorage.getItem('products'))
    return products
  }

  coupons() {
    return ['50DISCOUNT', 'NEWUSER']
  }

  setWishlist() {
    return this.http.get(this.dataSource)
  }

  initializeCart() {
    return this.http.get(this.dataSource)
  }

  setItems() {
    return this.http.get(this.dataSource)
  }
}
