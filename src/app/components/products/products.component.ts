import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsItem: any;
  constructor(private router: Router, private datashare: DataShareService) {
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
  }

  ngOnInit(): void {
    this.showProducts();
  }

  //getting all the products from localStroge
  showProducts() {
    let items = localStorage.getItem('products');
    this.productsItem = JSON.parse(items);
  }

  //push new whislist in localStroge
  addWhisList(item, index) {
    let allItem = JSON.parse(localStorage.getItem('whislist'));
  //   for (var i = 0; i < allItem.length; i++) {
  //     if (allItem[i].id === item.id) {
  //       allItem.splice(i, 1);
  //       alert('already in whislist')
  //       localStorage.setItem('whislist', JSON.stringify(allItem));
  //       this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
  //     }
  // }
  if (allItem.indexOf[index].id == item.id){
    debugger
    allItem.splice(index, 1);
  }
  else {
    alert('else chla ab')
  }


  // allItem.push(item)
  // localStorage.setItem('whislist', JSON.stringify(allItem));
  // this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
  }
  //remove space from title and send in route
  gotoProductDetails(item) {
    let handlePipeTitle = item.title.split(' ').join('-');
    this.router.navigate(['./product/', handlePipeTitle])
  }
}
