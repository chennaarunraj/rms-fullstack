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

  console.log("MenuComponent initialized"); // 🔥 DEBUG 1

  this.menuService.getMenu().subscribe({
    next: (data: any) => {
      console.log("MENU DATA:", data); // 🔥 DEBUG 2

      this.menuItems = data;
      this.filteredItems = data;

      const cats: string[] = data.map((item:any) => item.category);
      this.categories = ["All", ...Array.from(new Set<string>(cats))];
    },

    error: (err) => {
      console.error("MENU ERROR:", err); // 🔥 DEBUG 3
    }
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