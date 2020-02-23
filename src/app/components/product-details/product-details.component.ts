import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataShareService } from 'src/app/services/data-share.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  singleItem: any;
  itemTitle: any;
  itemQuentity: any;
  appliedCoupon: Boolean = true;
  validCoupon: any;
  promoForm: FormGroup
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datashare: DataShareService,
    private router: Router) {
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'));
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'));
    this.itemTitle = this.route.snapshot.params.title.split('-').join(' ');
    this.getSingleItemDetails();
    this.itemQuentity = 1;
    this.validCoupon = ['50DISCOUNT', 'NEWUSER50']
  }

  ngOnInit(): void {
    this.promoForm = this.fb.group({
      coupon: ['', Validators.required]
    })
  }

  applyCoupon(item) {
    let inputVal = this.promoForm.controls.coupon.value
    if (inputVal) {
      this.validCoupon.find(cop => {
        if (cop == inputVal) {
          this.singleItem.newprice = this.singleItem.newprice - 50;
          //get all products from local stroge
          let allPro = JSON.parse(localStorage.getItem('products'))
          allPro.forEach(element => {
            if (element.id === item.id) {
              element.promo = true;
              element.newprice = this.singleItem.newprice;
              localStorage.setItem('products', JSON.stringify(allPro))
              window.location.reload();
            }
          });
        }
      })
    }
    else {
      alert('please enter value')
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
      alert('Already in cart ! add another item')
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
    //fetch all cart item here
    let getAllCartItem = JSON.parse(localStorage.getItem('cart'))
    var index = getAllCartItem.findIndex(res => res.id == item.id)
    if (index === -1) {
      getAllCartItem.push(item);
      localStorage.setItem('cart', JSON.stringify(getAllCartItem))
    }
    else {
      console.log('Already in cart ! add another item')
    }
  }
}
