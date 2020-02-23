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
  isFavorite: Boolean = false;
  favItems = new Array<any>();
  constructor(
    private router: Router,
    private datashare: DataShareService,
    private route: ActivatedRoute
  ) {
    this.showProducts();
    this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    this.datashare.cartTotalItem.next(localStorage.getItem('cart'))
    this.route.snapshot.params.title
  }

  ngOnInit(): void {
    // Getting all the favourite items initially 
    this.fetchFavItems();
  }

  fetchFavItems() {
    this.favItems = JSON.parse(localStorage.getItem('whislist'));
  }

  // Boolean function to determine if particular product is amongst user's favourite list or not
  isFavourite(itemId): boolean {
    return this.favItems.findIndex(i => i.id == itemId) > -1;
  }

  //getting all the products from localStroge
  showProducts() {
    let items = localStorage.getItem('products');
    this.productsItem = JSON.parse(items);
  }

  //push new whislist in localStroge
  addWhisList(item) {
    let allItem = JSON.parse(localStorage.getItem('whislist'));
    var index = allItem.findIndex(res => res.id == item.id)
    if (index === -1) {
      // pushing same item in favItems array so that "isFavourite" can be syncronized
      this.favItems.push(item);
      allItem.push(item)
      localStorage.setItem('whislist', JSON.stringify(allItem));
      this.datashare.favWhislistCount.next(localStorage.getItem('whislist'))
    }
    else {
      allItem.splice(index, 1);
      // removing the same item from favitemlist (if exists) 
      let favItemIndex = this.favItems.findIndex(i => i.id == item.id);
      if (favItemIndex > -1)
        this.favItems.splice(favItemIndex, 1);
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
