import { Component, OnInit } from '@angular/core';
import { Product, Client } from '../services/invoice.webapi.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [Client]
})
export class ProductsComponent implements OnInit {

  product: Product = new Product();
  productModal: Product = new Product();
  products: Product[] = [];
  constructor(private _client: Client, private modalService: NgbModal) { }

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

  saveProduct() {
    this._client.products(this.product).subscribe(data => {
      this.getAllProducts();
      alert("Producto almacenado!");
    }, error => {
      alert('Error guardando')
    })
  }
  showEditProduct(item: Product) {

  }

  deleteProduct(item: Product) {
    this._client.products4(item.id).subscribe(data => {
      this.getAllProducts();
      alert("Producto Eliminado!");
    }, error => {
      alert('Error guardando')
    })
  }

  saveEditProduct() {
    this._client.products3(this.productModal.id,this.productModal).subscribe(data => {
      this.getAllProducts();
      alert("Producto Actualizado!");
    }, error => {
      alert('Error guardando')
    })
  }

  openEditproduct(content:any, item:Product) {
    this.productModal.id= item.id;
    this.productModal.name= item.name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.getAllProducts();
    });
  }

}
