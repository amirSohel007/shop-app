import { Component, OnInit } from '@angular/core';
import { DataShareService } from './services/data-share.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private datashare: DataShareService, ) {
    this.setProducts();
    this.setWhisList();
    this.initializeCart();
  }

  ngOnInit() {
    
  }
  //set product list in localStroge
  setProducts() {
    this.datashare.setItems().subscribe(data => {
      let products = JSON.stringify(data['products'])
      localStorage.setItem('products', products)
    })
  }

  //initialize blank whislist arrya for first time
  setWhisList() {
    this.datashare.setWishlist().subscribe(data => {
      let whislist = JSON.stringify(data['whislist'])
      if (localStorage.getItem("whislist") === null) {
        localStorage.setItem('whislist', whislist);
      }
      else {
        localStorage.setItem('whislist', localStorage.getItem('whislist'))
      }
    })
  }

  //initialize blank cart arrya for first time
  initializeCart() {
    this.datashare.initializeCart().subscribe(data => {
      let cart = JSON.stringify(data['cart']);
      if (localStorage.getItem("cart") === null) {
        localStorage.setItem('cart', cart)
      }
      else {
        localStorage.setItem('cart', localStorage.getItem('cart'))
      }
    })
  }
}