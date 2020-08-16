import { Component, OnInit } from '@angular/core';
import { Product, Client } from '../services/invoice.webapi.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[Client]
})
export class ProductsComponent implements OnInit {

  product: Product = new Product();
  products: Product[] = [];
  constructor(private _client: Client) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._client.productsAll().subscribe(data => {
      this.products = data;
    }, error => {
      alert('Error Consultando productos')
    })
  }

  saveProduct(){
    this._client.products(this.product).subscribe(data => {
      this.getAllProducts();
     alert("Producto almacenado!");
    }, error => {
      alert('Error guardando')
    })
  }

}
