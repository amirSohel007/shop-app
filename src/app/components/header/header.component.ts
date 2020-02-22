import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  itemCount = 0;
  cartCount = 0
  getAllWhislist: any;
  totalAddItem: any
  userInfo : any;
  constructor(
    private datashare: DataShareService,
    ) {
    this.updateWhislistval()
    this.updateCartval()
    this.getUserInfo();
  }
  ngOnInit(): void {
    this.getUserInfo();
  }

  updateWhislistval() {
    this.datashare.favWhislistCount.subscribe(res => {
      if (res == null) {
        this.datashare.favWhislistCount.next(0)
        
      }
      else {
        this.getAllWhislist = JSON.parse(res);
        this.itemCount = this.getAllWhislist.length
      }
    })
  }

  updateCartval() {
    this.datashare.cartTotalItem.subscribe(res => {
      if (res == null) {
        this.datashare.cartTotalItem.next(0)
      }
      else {
        this.totalAddItem = JSON.parse(res);
        this.cartCount = this.totalAddItem.length
      }
    })
  }

//remove cart items and update in localStroge and service observable
  removeCartItem(index) {
    this.totalAddItem.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.totalAddItem));
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'));
  }

  getUserInfo(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
}
