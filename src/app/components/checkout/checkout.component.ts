import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
  isAdress : Boolean = false;
  trimTitle : any;
  userAddress : any;
  constructor(
      private route : ActivatedRoute,
      private datashare : DataShareService,
      private fb : FormBuilder,
      private router : Router,
      )
      {
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
    this.itemTitle = this.route.snapshot.params.title.split('-').join(' ');
    this.getSingleItemDetails();
    this.isAddress();
   }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name:['', Validators.required],
      address:['', Validators.required],
      city:['', Validators.required],
      state : ['', Validators.required],
      country : ['', Validators.required],
      postal : ['', Validators.required,]
    })
    this.checkoutForm.valueChanges.subscribe(res => console.log(res))
  }

  getSingleItemDetails() {
    this.singleItem = this.datashare.getItemList().find(result => {
      return result.title == this.itemTitle
    })
  }

  isAddress(){
    if(localStorage.getItem('shipping')){
      this.isAdress = true;
      let getAddress = localStorage.getItem('shipping')
      this.userAddress = JSON.parse(getAddress);
    }
  }

  orderPlace(item){
      localStorage.setItem('shipping', JSON.stringify(this.checkoutForm.value));
  }

  gotoPayment(){
    window.location.href = "/payment-mode";
  }
}
