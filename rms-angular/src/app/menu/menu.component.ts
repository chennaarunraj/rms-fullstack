import { CartService } from '../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: any[] = [];
  filteredItems: any[] = [];

  categories: string[] = [];
  selectedCategory: string = "All";

constructor(
  private menuService: MenuService,
  private cartService: CartService
){}
ngOnInit() {

  this.menuService.getMenu().subscribe((data:any) => {

    this.menuItems = data;
    this.filteredItems = data;

    const cats: string[] = data.map((item:any) => item.category);
    this.categories = ["All", ...Array.from(new Set<string>(cats))];

  });

}

 addToCart(item:any){
  this.cartService.addToCart(item);
   }

  filterCategory(category:string) {

    this.selectedCategory = category;

    if(category === "All"){
      this.filteredItems = this.menuItems;
    } else {
      this.filteredItems = this.menuItems.filter(
        item => item.category === category
      );
    }

  }

}