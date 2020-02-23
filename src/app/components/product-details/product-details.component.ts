import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  singleItem: any;
  itemTitle: any;
  itemQuentity: any;
  availCoupon: any;
  coupons: any;
  constructor(
    private route: ActivatedRoute,
    private datashare: DataShareService,
    private router: Router) {
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'));
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
    this.itemTitle = this.route.snapshot.params.title.split('-').join(' ');
    this.getSingleItemDetails()
    this.itemQuentity = 1;
    this.coupons = "50DISCOUNT"
  }

  ngOnInit(): void {

  }


  applyCoupon(coupon) {
    let userCoupon = coupon.value;
    if (userCoupon === "50DISCOUN") {
      alert('mil gya')
    }
    else {
      alert('nai mila')
    }
  }
  //push new whislist in localStroge
  addCart(item) {
    let allItem = JSON.parse(localStorage.getItem('cart'))
    var index = allItem.findIndex(res => res.id == item.id)
    if (index === -1) {
      allItem.push(item);
      localStorage.setItem('cart', JSON.stringify(allItem));
      this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
    }
    else {
      alert('item already in cart')
    }
  }

  //get single product details
  getSingleItemDetails() {
    this.singleItem = this.datashare.getItemList().find(result => {
      return result.title == this.itemTitle;
    })
  }

  checkoutItem(item) {
    let handlePipeTitle = item.title.split(' ').join('-');
    this.router.navigate(['./product/', handlePipeTitle, '/checkout'])
    //got all cart item here
    let getAllCartItem = JSON.parse(localStorage.getItem('cart'))
    var index = getAllCartItem.findIndex(res => res.id == item.id)
    if (index === -1) {
      getAllCartItem.push(item);
      localStorage.setItem('cart', JSON.stringify(getAllCartItem))
    }
    else {
      console.log('prodcut already in cart')
    }
  }
}
