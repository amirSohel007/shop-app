import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsItem: any;
  isFavorite:Boolean = false;
  constructor(
     private router: Router,
     private datashare: DataShareService,
     private route : ActivatedRoute
    ) {
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
    this.route.snapshot.params.title
    debugger
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
  addWhisList(item) {
    //item.isFav = true;
    let allItem = JSON.parse(localStorage.getItem('whislist'));
    var index = allItem.findIndex(res => res.id == item.id)
    if (index === -1) {
      this.isFavorite = item.id;
      allItem.push(item)
      localStorage.setItem('whislist', JSON.stringify(allItem));
      this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    }
    else {
      allItem.splice(index, 1);
      //allItem[index].isFav = false
      localStorage.setItem('whislist', JSON.stringify(allItem));
      this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    }
  }

  //remove space from title and send in route
  gotoProductDetails(item) {
    let handlePipeTitle = item.title.split(' ').join('-');
    this.router.navigate(['./product/', handlePipeTitle])
  }
}
