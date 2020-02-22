import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm : FormGroup
  singleItem : any;
  itemTitle : any;
  constructor(
      private route : ActivatedRoute,
      private datashare : DataShareService,
      private fb : FormBuilder)
      {
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
    this.itemTitle = this.route.snapshot.params.title.split('-').join(' ');
    this.getSingleItemDetails();
    
   }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name:'',
    })
    this.checkoutForm.valueChanges.subscribe(res => console.log(res))
  }

  getSingleItemDetails() {
    this.singleItem = this.datashare.getItemList().find(result => {
      return result.title == this.itemTitle
    })
  }

}
