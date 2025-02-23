import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: string[] = [];
  products: any[] = [];
  searchQuery: string = '';
  filteredProducts: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(data => this.categories = data);
  }

  loadProducts(category: string): void {
    this.apiService.getProductsByCategory(category).subscribe(data => this.products = data);
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  viewProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

}
