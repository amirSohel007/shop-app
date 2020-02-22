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
  availCoupon: any;
  couponForm : FormGroup
  constructor(
    private route: ActivatedRoute,
    private datashare: DataShareService,
    private fb : FormBuilder,
    private router : Router) {
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'));
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
    this.itemTitle = this.route.snapshot.params.title.split('-').join(' ');
    this.getSingleItemDetails()
    this.itemQuentity = 1;
    this.couponForm = this.fb.group({
      coupon:['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  addCoupon(addCoupon) {
     this.availCoupon = this.datashare.coupons().filter(validCoupon => {
       if (validCoupon == addCoupon.value){
         debugger
          this.singleItem.newprice = this.singleItem.newprice - 50;

       }
     });
        if ('50DISCOUND' == this.couponForm.value) {
        }    
  }

  //push new whislist in localStroge
  addCart(item) {
    let allItem = JSON.parse(localStorage.getItem('cart'))
    allItem.push(item);
    localStorage.setItem('cart', JSON.stringify(allItem));
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
  }

  //get single product details
  getSingleItemDetails() {
    this.singleItem = this.datashare.getItemList().find(result => {
      return result.title == this.itemTitle
    })
  }

  checkoutItem(item){
    let handlePipeTitle = item.title.split(' ').join('-');
    this.router.navigate(['./product/',handlePipeTitle,'/checkout'])
  }
}
